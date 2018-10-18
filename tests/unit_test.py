import unittest
from image_sizer import createFolder
from image_sizer import resize_all
from image_sizer import move_files
directory = './ig_size/'


class TestImageSizer(unittest.TestCase):

    def test_createFolder(self):
        createFolder(directory)
        self.assertTrue(os.path.exists(directory))

    def test_resize_all(self):
        # gets first image before resize
        pic = sorted(glob.glob('DSC_*.JPG'))[0]  # input picture files are .JPG
        pre = os.path.getmtime(pic)
        resize_all()
        # gets first image after resize
        pic = sorted(glob.glob('DSC_*.JPG'))[0]
        post = os.path.getmtime(pic)
        self.assertTrue(pre != post)

    def test_move_files(self):
        move_files()
        pics = os.listdir(directory)
        self.assertTrue(len(pics) > 0)

    def test_file_add(self):
        self.assertTrue(True, True)



if __name__ == '__main__':
    unittest.main()
