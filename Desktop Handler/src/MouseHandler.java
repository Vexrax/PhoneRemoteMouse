import java.awt.*;
import java.awt.event.InputEvent;


public class MouseHandler
{
    public void MoveMouse(int xVector, int yVector, double time) throws AWTException
    {
            Robot robot = new Robot();
            Point Current_Mouse = MouseInfo.getPointerInfo().getLocation();
            Point New_Mouse_Location = CalculateNewMouseCoords(xVector, yVector, Current_Mouse.x, Current_Mouse.y);
            robot.mouseMove(New_Mouse_Location.x, New_Mouse_Location.y);
    }

    private Point CalculateNewMouseCoords(int xVector, int yVector, int currentX, int currentY)
    {
        return new Point(currentX + xVector, currentY + yVector);
    }

    public void MouseLeftClick() throws AWTException
    {
        Robot robot = new Robot();
        robot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
        robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
    }

    public void MouseRightClick() throws AWTException
    {
        Robot robot = new Robot();
        robot.mousePress(InputEvent.BUTTON2_DOWN_MASK);
        robot.mouseRelease(InputEvent.BUTTON2_DOWN_MASK);
    }
}
