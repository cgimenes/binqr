from os import path, listdir
from shutil import rmtree
from tempfile import mkdtemp
from base64 import b64encode
from src.binqr import binqr
import imageio


def process(filename, file_bytes):
    images = binqr.convert(filename, file_bytes)

    temp_dir = mkdtemp(prefix='binqr')

    for idx, image in enumerate(images):
        image.save(path.join(temp_dir, str(idx + 1)))

    # Teste de GIF
    images = []
    for file_name in listdir(temp_dir):
        images.append(imageio.imread(path.join(temp_dir, file_name)))

    imageio.mimwrite(path.join(temp_dir, 'gif.gif'), images, fps=2)

    return temp_dir


def get_images(directory):
    encoded_images = {}

    for file in listdir(directory):
        with open(path.join(directory, file), "rb") as image_file:
            encoded_string = b64encode(image_file.read()).decode()
            encoded_images[file] = encoded_string

    rmtree(directory)

    return encoded_images
