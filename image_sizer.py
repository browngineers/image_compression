import PIL, resizeimage, glob, os, sys
from PIL import Image as IMG
from PIL import ImageFilter
from resizeimage import resizeimage
pics = sorted(glob.glob('*.jpg'))  # input picture files are .JPG


def createFolder(directory):  # create folder to hold resized images within current folder
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print('Error: Creating directory. ' + directory)


def resize_all():  # resize JPG images in the same folder as image_sizer.py
    for pic in pics:
        print('working on ' + pic)
        bw(pic) # convert ot BW
        with open(pic, 'r+b') as f:
            with IMG.open(f) as picture:
                new_name = 'resized_' + str(pic) + ".jpg" # saving as .jpg
                dpi_val = picture.info['dpi']
                # Instagram square dim is 640x640px
               #cover = resizeimage.resize_contain(picture, [1000, 1000])
                cover = resizeimage.resize_contain(picture, [640,640])  # only resizing, no cropping
                cover = cover.convert("RGB")
                cover.save(new_name, picture.format, quality = 100, dpi = dpi_val)

                picture.close()


def move_files():  # move resized files to their own folder within main folder
    resized = sorted(glob.glob('resized_*.JPG'))
    bw = sorted(glob.glob('BW_*.JPG'))
    sharp = sorted(glob.glob('Sharp_*.JPG'))
    for pic in resized:
        src = pic
        dst = './ig_size/'+pic
        os.rename(src, dst)
    for pic in bw:
        src = pic
        dst = './ig_size/'+pic
        os.rename(src, dst)
    for pic in sharp:
        src = pic
        dst = './ig_size/'+pic
        os.rename(src, dst)


def bw(pic):  # black and white
    bw = IMG.open(pic)
    bw = bw.convert('1') # convert to BW
    bw.save('BW_' + str(pic)) # save as jpg
    return


def sharp(pic):  # black and white
    sharp = IMG.open(pic)
    #blur = blur.filter(ImageFilter.GaussianBlur(radius=50)) # add blur, radius = 50
    sharp = sharp.filter(ImageFilter.UnsharpMask(radius=8, percent=150, threshold=3))  # add blur, radius = 50
    sharp.save('Sharp_' + str(pic) + '.jpg') # save as jpg
    return


def main():
    createFolder('./ig_size/')
    resize_all()
    move_files()

    print('Finished program')
    sys.stdout.flush()


main()
