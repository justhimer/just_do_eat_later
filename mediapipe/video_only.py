###########################
### import dependencies ###
###########################

import cv2
import mediapipe as mp
import numpy as np
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose

##################
### video feed ###
##################

# setup video capture device, could be camera, microphone etc.
cap = cv2.VideoCapture(0)  # 0 is the number representing my webcam

while cap.isOpened():
    ret, frame = cap.read()  # ret is return variable (nothing in there), frame gives us the image
    cv2.imshow('MediaPipe Pose', frame)  # pop up on screen, "Mediapipe Pose" is just a random name

    # quit if we close our screen or press 'q'
    if cv2.waitKey(5) & 0xFF == ord('q'):
      break

cap.release()
cv2.destroyAllWindows()
