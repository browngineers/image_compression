import unittest
from image_sizer import createFolder

class TestImageSizer(unittest.TestCase):

    def test_createFolder(self):
        directory = './test'
        createFolder(directory)
        self.assertTrue(os.path.exists(directory))


if __name__ == '__main__':
    unittest.main()
