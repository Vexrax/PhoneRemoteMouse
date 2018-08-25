import pyautogui, sys

def MouseMove(xVector, yVector):
    pyautogui.moveRel(xVector, yVector)
    pyautogui.FAILSAFE = False

def LeftMouseClick():
    pyautogui.click(button='left')
def RightMouseClick():
    pyautogui.click(button='right')
