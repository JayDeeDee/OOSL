#!/usr/bin/python
# -*- encoding: utf-8 -*-

__author__ = 'deutschlaender'

"""
ESA 2 ": exercise

PyGame 'Hit the mole'
1. Extend the Paint script to
    * change the color of the brush by pressing a key (black, red, yellow)
    * change diameter of the brush by pressing the 'p' or 'm' keys
    * save the image / a screen shot as PNG by pressing the s key

2. Clicking on the mole
    * plays a sound
    * makes the mole move (turns around)
    * hit the mole with a shovel cursor
    * make the mole move around every 1 second if he's not hit
    * the number of hits is displayed at the top of the screen

"""

# Import Modules
import os.path
import datetime
import time
import pygame
import pygame.gfxdraw
from pygame.locals import *

if not pygame.font:
    print 'Warning, fonts disabled'
if not pygame.mixer:
    print 'Warning, sound disabled'


def save_screen(screen):
    suffix = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d-%H-%M-%S')
    fullname = os.path.join('screens', 'screen_shot_'+suffix+'.png')
    pygame.image.save(screen, fullname)


def load_img(name, color_key=None, img_type='Asset'):
    img_path = os.path.join('data', name)
    print img_path
    try:
        img = pygame.image.load(img_path)
    except pygame.error, message:
        print 'Cannot load image:', img_path
        raise SystemExit, message
    img = img.convert()
    if color_key is not None:
        if color_key is -1:
            color_key = img.get_at((0,0))
        img.set_colorkey(color_key, RLEACCEL)
    if img_type is 'Asset':
        return img, img.get_rect()
    return img


def load_sound(name):
    class NoneSound:
        def play(self): pass
    if not pygame.mixer or not pygame.mixer.get_init():
        return NoneSound()
    fullname = os.path.join('data', name)
    try:
        sound = pygame.mixer.Sound(fullname)
    except pygame.error, message:
        print 'Cannot load sound:', fullname
        raise SystemExit, message
    return sound


class Brush(pygame.sprite.Sprite):
    """moves the brush / shovel on the screen, following the mouse"""
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        self.black, self.black_rect = load_img('blackBrush.bmp', -1)
        self.black_color = (0,0,0)
        self.yellow, self.yellow_rect = load_img('yellowBrush.bmp', -1)
        self.yellow_color = (255,203,0)
        self.red, self.red_rect = load_img('redBrush.bmp', -1)
        self.red_color = (255,0,0)
        self.shovel, self.shovel_rect = load_img('shovel.bmp', -1)

        self.set_black()
        self.connect = 0
        self.size = 128
        self.is_shovel = False

    def update(self):
        """move the brush based on the mouse position"""
        pos = pygame.mouse.get_pos()
        self.rect.midtop = pos
        if self.connect:
            self.rect.move_ip(5, 10)

    def set_black(self):
        """switch the color, color code and brush to black"""
        self.image = self.black
        self.rect = self.black_rect
        self.brush_color = self.black_color
        self.color = 0

    def set_red(self):
        """switch the color, color code and brush to red"""
        self.image = self.red
        self.rect = self.red_rect
        self.brush_color = self.red_color
        self.color = 1

    def set_yellow(self):
        """switch the color, color code and brush to red"""
        self.image = self.yellow
        self.rect = self.yellow_rect
        self.brush_color = self.yellow_color
        self.color = 2

    def set_shovel(self):
        """switch to shovel cursor, current color doesn't change, including scaling"""
        self.image = self.shovel
        self.rect = self.shovel_rect
        self.image = pygame.transform.scale(self.image, (self.size,self.size))
        self.rect.inflate((self.size,self.size))
        self.is_shovel = True

    def set_brush(self):
        """switch to brush cursor, current color doesn't change"""
        self.set_current_color()
        self.is_shovel = False

    def set_current_color(self):
        """sets brush cursor, color and image to current color, necessary for scaling"""
        if self.color == 0:
            self.set_black()
        elif self.color == 1:
            self.set_red()
        elif self.color == 2:
            self.set_yellow()
        self.image = pygame.transform.scale(self.image, (self.size,self.size))
        self.rect.inflate((self.size,self.size))

    def switch_color(self):
        """switch color to black, red or yellow"""
        if self.color == 0:
            self.set_red()
        elif self.color == 1:
            self.set_yellow()
        elif self.color == 2:
            self.set_black()
        self.image = pygame.transform.scale(self.image, (self.size,self.size))
        self.rect.inflate((self.size,self.size))

    def hit(self, target):
        """returns true if the brush collides with the mole"""
        if not self.connect:
            self.connect = 1
            hit_point = self.rect.midbottom
            return target.rect.collidepoint(hit_point)

    def hover(self, target):
        """returns true if the brush hovers over the mole"""
        hover_point = self.rect.midbottom
        return target.rect.collidepoint(hover_point)

    def reset(self):
        """reset collision chnages"""
        self.connect = 0
        self.set_current_color()
        self.is_shovel = False

    def decrease_brush(self):
        """decrease the size of the brush / shovel"""
        if self.size > 16:
            self.size = self.size / 2
            self.image = pygame.transform.scale(self.image, (self.size,self.size))

    def increase_brush(self):
        """increase the size of the brush / shovel"""
        if self.size < 256:
            self.size = self.size * 2
            self.set_current_color()

    def show_shovel(self):
        """switch to shovel cursor if it is currently a brush cursor"""
        if not self.is_shovel:
            self.set_shovel()

    def show_brush(self):
        """switch to brush cursor if it is currently a shovel cursor"""
        if self.is_shovel:
            self.set_brush()

    def paint_stroke(self, surface, x, y):
        """paint a filled circle"""
        pygame.gfxdraw.filled_circle(surface, x+self.size/4, y+self.size+self.size/4, self.size/6, self.brush_color)
        pygame.display.update()


class Mole(pygame.sprite.Sprite):
    """draws and moves a mole in the screen"""
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        self.image, self.rect = load_img('mole.bmp', -1)
        screen = pygame.display.get_surface()
        self.area = screen.get_rect()
        self.rect.topleft = 30, 30
        self.speed = [4, 4]
        self.walking = False

    def update(self):
        """update function for loop"""
        self._walk()

    def is_hit(self):
        """if the mole is hit, it moves in the other direction"""
        self.speed[0] = -self.speed[0]
        self.speed[1] = -self.speed[1]
        self.image = pygame.transform.flip(self.image, 1, 1)

    def _walk(self):
        """moves the mole on the screen and let it move back before it leaves the screen"""
        # if self.walking:
        new_pos = self.rect.move(self.speed)
        if self.rect.left < self.area.left or self.rect.right > self.area.right:
            self.speed[0] = -self.speed[0]
            new_pos = self.rect.move(self.speed)
            self.image = pygame.transform.flip(self.image, 1, 0)
        if self.rect.top < self.area.top or self.rect.bottom > self.area.bottom:
            self.speed[1] = -self.speed[1]
            new_pos = self.rect.move(self.speed)
            self.image = pygame.transform.flip(self.image, 0, 1)
        # else:
           # new_pos = self.rect.move([0,0])
        self.rect = new_pos


def main():

    # Initialize
    p = pygame
    p.init()

    # Display
    display = p.display
    size = (640,480)
    screen = display.set_mode(size)
    screen.fill((255, 255, 255))
    display.set_caption('Hit the mole')
    p.mouse.set_visible(0)

    # background
    bg = load_img('background.png',None,'Background')
    screen.blit(bg, (0, 0))

    # Entities
    pygame.display.update()
    pygame.display.flip()
    score_num = 0
    keep_going = 1
    paint = False
    mole = Mole()
    brush = Brush()
    sound = load_sound('hit.wav')
    # all_sprites = pygame.sprite.RenderPlain((mole,brush))
    # renderPlain doesn't work, layeredUpdates makes sure the brush is always in front
    actor_layer=pygame.sprite.LayeredUpdates()
    actor_layer.add(mole)
    actor_layer.add(brush)

    # time_since_last_action = 0
    clock = pygame.time.Clock()

    while keep_going:
        # Timing
        td = clock.tick(30)
        # time_since_last_action += td

        # if time_since_last_action > 1000:
            # print time_since_last_action
            # mole.walking = True
            # time_since_last_action = 0
        # else:
            # mole.walking = False

        #switch brush / shovel cursor
        if brush.hover(mole):
            brush.show_shovel()
        else:
            brush.show_brush()

        # event handling
        for event in pygame.event.get():
            if event.type == QUIT:          # close button is clicked
                keep_going = 0
            elif event.type == KEYDOWN:
                if event.key == K_ESCAPE:   # escape key is pressed
                    keep_going = 0
                elif event.key == K_s:      # s key is pressed
                    save_screen(screen)
                elif event.key == K_m:      # m key is pressed
                    brush.increase_brush()
                elif event.key == K_p:      # p key is pressed
                    brush.decrease_brush()
                else:
                    brush.switch_color()    # any other key is pressed

            elif event.type == MOUSEBUTTONDOWN:
                if brush.hit(mole):
                    sound.play()
                    score_num += 1
                    mole.is_hit()
                    # mole.walking = True
                    # time_since_last_action = 0
                    paint = False
                else:
                    paint = True
                    # mole.walking = False

            elif event.type == MOUSEBUTTONUP:
                paint = False
                brush.reset()

        # paint if brush cursor
        if paint:
            x,y = pygame.mouse.get_pos()
            brush.paint_stroke(bg, x-brush.size/2, y-brush.size/2)
            pygame.display.update()

        # all_sprites.update()
        # update sprites and redraw the layer
        mole.update()
        brush.update()
        actor_layer.draw(screen)

        # set current score
        if pygame.font:
            font = pygame.font.Font(None, 22)
            score = font.render("score: {0}".format(score_num),1, (64, 38, 13), (247, 242, 161))
            bg.blit(score, (10, 10))

        screen.blit(bg, (0, 0))
        # all_sprites.draw(screen)
        actor_layer.draw(screen)
        pygame.display.flip()

if __name__ == '__main__':
    main()
