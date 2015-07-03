import os

#from fabric.api import *
#import fabric.api as fabric_api

app_name = 'frontend_fw'


def hello(name="world",test="Test"):
    print("Hello %s!" % name)
    print(test)


def screenshot():
    # Get CWD
    my_path = os.path.dirname(os.path.realpath(__file__))
    print(my_path)

