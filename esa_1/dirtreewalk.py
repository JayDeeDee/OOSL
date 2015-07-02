#!/usr/bin/python
# -*- encoding: utf-8 -*-

__author__ = 'deutschlaender'

"""
ESA 1: Aufgabenstellung
Erstellen Sie ein Programm, welches einen Verzeichnisbaum durchwandert (inkl. der Unterverzeichnisse -- also
rekursiv). Ermitteln Sie für jeden gefundenen Eintrag die MD5-Summe.
Das Programm soll auf der Standardausgabe fuer jeden gefundenen Eintrag (Datei, Verzeichnis, Link, ..) den Dateinamen,
den Dateipfad (relativ zum Startverzeichnis) sowie  die MD5-Summe  ausgeben.
Das Startverzeichnis soll als Parameter uebergeben werden.
Verwenden Sie nicht os.walk oder os.path.walk.
Fangen Sie Exceptions, die zum Beispiel auftreten, wenn die Leserechte fehlen.

Nuetzliche Module bzw. Funktionen sind hashlib, os.listdir.

"""

import os
import hashlib


class DirTreeWalk(object):

    """
The program runs through a directory recursively and generates for each entry an MD5 sum

For each entry in the directory tree, the program states the following data to the console:
* file name
* file typ
* relative path to top directory
* MD5 hash

Depending on the type of entry the basis for the MD5 hash varies
* file: file content
* mount: entry name
* link: entry name
* directory: entry name + non-recursive: entry names of sub directories, mounts and links as well as file content of
  included files

    """

    def __init__(self, directory=os.getcwd()):
        self.__top_directory = directory

    def start(self):
        self.walk_tree(self.__top_directory, 1)

    def walk_tree(self, directory, is_top=0):

        _join = os.path.join
        _top = os.path.normcase(directory)

        if self.is_valid_path(_top):

            if is_top:
                self.print_header()

            for p in os.listdir(_top):
                full_path = _join(_top, p)

                if self.is_file(full_path):
                    if self.is_readable(full_path):
                        self.print_info(p, 'file', full_path)
                        self.print_hash_value('file', p, full_path)
                    else:
                        self.handle_missing_reading_permission(p, 'file', full_path)

                elif self.is_mount(full_path):
                    self.print_info(p, 'mount', full_path)
                    self.print_hash_value('mount', p, full_path)

                elif self.is_link(full_path):
                    self.print_info(p, 'link', full_path)
                    self.print_hash_value('link', p, full_path)

                elif self.is_dir(full_path):
                    if self.is_readable(full_path):
                        self.print_info(p, 'dir', full_path)
                        self.print_hash_value('dir', p, full_path)
                        self.walk_tree(full_path)  # recursion for sub dir
                    else:
                        self.handle_missing_reading_permission(p, 'dir', full_path)

        else:
            self.handle_invalid_path(directory)

    @staticmethod
    def is_valid_path(path):
        return os.access(path, os.F_OK)

    @staticmethod
    def is_readable(path):
        return os.access(path, os.R_OK)

    @staticmethod
    def is_file(path):
        return os.path.isfile(path)

    @staticmethod
    def is_dir(path):
        return os.path.isdir(path)

    @staticmethod
    def is_link(path):
        return os.path.islink(path)

    @staticmethod
    def is_mount(path):
        return os.path.ismount(path)

    @staticmethod
    def get_basename(p):
        return os.path.basename(p)

    @staticmethod
    def calculate_file_md5_buffer(full_path, is_update=0):
        md5_value = hashlib.md5()
        fh = open(full_path, 'rb')
        while 1:
            buff = fh.read(4096)
            if not buff:
                break
            md5_value.update(buff)
        if is_update:
            return md5_value
        return md5_value.hexdigest()

    @staticmethod
    def calculate_file_md5(full_path):
        with open(full_path, 'rb') as file_to_check:  # 'rb' for binary mode
            data = file_to_check.read()
            md5_value = hashlib.md5(data)
        return md5_value.hexdigest()

    @staticmethod
    def handle_invalid_path(directory):
        print ('Invalid path: %s' % directory)

    @staticmethod
    def print_line():
        print '-----------------------------------------------------------------'

    def print_header(self):
        line = '{basename:<40} {type:<5} {relpath:<60}'.format(
            basename='name',
            type='type',
            relpath='path / hash'
        )
        print 'directory tree: ' + self.__top_directory
        self.print_line()
        print line
        self.print_line()

    def calculate_dir_md5_buffer(self, p, full_path):
        md5_value = hashlib.md5(self.get_basename(p))  # hash of dir's name

        try:
            for p_sub in os.listdir(full_path):
                try:
                    if self.is_readable(full_path):
                        if self.is_file(full_path):
                            md5_value.update(self.calculate_file_md5_buffer(full_path, 1))
                        elif self.is_mount(full_path) or self.is_link(full_path) or self.is_dir(full_path):
                            md5_value.update(self.get_basename(p_sub))
                except OSError, e:
                    print e
                except Exception, e:
                    print e
        except OSError, e:
            print e

        return md5_value.hexdigest()

    def calculate_mount_md5(self, p):
        return hashlib.md5(self.get_basename(p)).hexdigest()  # hash of mount's name

    def calculate_link_md5(self, p):
        return hashlib.md5(self.get_basename(p)).hexdigest()  # hash of symbolic link's name

    def get_rel_path(self, full_path):
        rel_path = os.path.relpath(full_path, self.__top_directory)
        (file_path, file_name) = os.path.split(rel_path)
        return file_path

    def print_info(self, p, p_type, full_path):
        line = '{basename:<40} {type:<5} {relpath:<60}'.format(
            basename=self.get_basename(p),
            type=p_type,
            relpath=self.get_rel_path(full_path)
        )
        print(line)

    def handle_missing_reading_permission(self, p, p_type, full_path):
        line = '{basename:<40} {type:<5} {relpath:<60}'.format(
            basename=self.get_basename(p),
            type=p_type,
            relpath=self.get_rel_path(full_path)
        )
        print(line)
        message = '{placeholder:<46} {status:<50}'.format(
            placeholder='',
            status='Missing reading permission'
        )
        print(message)

    def print_hash_value(self, p_type, p, full_path):
        hash_value = ''
        if p_type == 'file':
            hash_value = self.calculate_file_md5_buffer(full_path)
        elif p_type == 'dir':
            hash_value = self.calculate_dir_md5_buffer(p, full_path)
        elif p_type == 'mount':
            hash_value = self.calculate_mount_md5(p)
        elif p_type == 'link':
            hash_value = self.calculate_link_md5(p)

        line = '{placeholder:<46} {hash_value:<50}'.format(
            placeholder='',
            hash_value=hash_value
        )
        print(line)


if __name__ == '__main__':

    import sys

    def print_line():
        print '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'

    def print_intro():
        print_line()
        print_text('absolute/path/to/dir','use custom directory')
        print_text('relative/path/to/dir','sub dir of working directory')
        print_text('w','use working directory')
        print_text('d','doc')
        print_text('q','exit program')

    def print_text(short, explanation):
        line = '{short:<26} {explanation:<30}'.format(
            short=short,
            explanation=explanation
        )
        print(line)

    running = 1
    print_line()
    print_text('', 'DirTreeWalk')
    walk = DirTreeWalk()
    while running:
        print_intro()
        answer = raw_input('your choice: ')
        if answer == 'q':  # exit program
            running = 0
            sys.exit(0)
        elif answer == 'w':  # use working dir as top directory
            print_line()
            walk.start()
        elif answer == 'd':  # show class documentation
            print_line()
            print(walk.__doc__)
        else:                # path for top directory expected
            walk = DirTreeWalk(answer)
            print_line()
            walk.start()
