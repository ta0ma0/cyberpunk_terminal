import os
import random
import sys

dir_path = os.path.dirname(os.path.realpath(__file__))

# Добавляем директорию в sys.path
if dir_path not in sys.path:
    sys.path.insert(0, dir_path)

convers_dir = dir_path + '/hackers_conversations'

def readfile():
    random_file = randomfile(convers_dir=convers_dir)
    convers_list = []       
    with open(random_file) as file:
        for line in file:
            line = line.replace('\n', '')
            convers_list.append(line)
            # print(line)
        # string = file.readline
    return convers_list


def randomfile(convers_dir):
    """
    Chooses a random file from the specified directory.

    Args:
        convers_dir: path the directory (strig)

    Returns:
    The full path to randomly choosen file, or None if the directory
    is empty or dosn't exist.
    """

    try:
        files = os.listdir(convers_dir)
    except FileNotFoundError:
        print(f"Error: Directory not found: {convers_dir}")
        return None


    files = [f for f in files if os.path.isfile(os.path.join(convers_dir, f))]

    if not files:
        print(f"Warning: Directory is empty: {convers_dir}")
        return None

    choosen_file = random.choice(files)

    return os.path.join(convers_dir, choosen_file)

# random_file = randomfile(convers_dir=convers_dir)

# print(random_file)
readfile()