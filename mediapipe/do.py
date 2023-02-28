import cv2
import mediapipe as mp
import numpy as np
from py_utils import calculate_angle

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose

# setup video capture device, could be camera, microphone etc.
cap = cv2.VideoCapture(0)  # 0 is the number representing my webcam
cap_width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
cap_height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

# setup pose detection variable
joint_status_description = ("stright", "half-bent", "full-bent")
left_arm_status = None  # can be set to index of joint_status_description
right_arm_status = None  # can be set to index of joint_status_description

# using pose model, bump up confidence to detect more accurate match
with mp_pose.Pose(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as pose:

  # read from cap and show it out
  while cap.isOpened():
      ret, frame = cap.read()  # ret is return variable (nothing in there), frame gives us the image

      # recolor image to RGB to work in mediapipe
      image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # by default image feed in opencv is BGR
      image.flags.writeable = False  # save more memory

      # make detection (very important)
      results = pose.process(image)

      # recolor back to BGR to work in opencv
      image.flags.writeable = True
      image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

      # extract landmarks
      try:
        landmarks = results.pose_landmarks.landmark

        # get normalized coordinates
        left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
        right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
        left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
        right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
        left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
        right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]

        # calculate angle
        left_elbow_angle = calculate_angle(left_shoulder, left_elbow, left_wrist)
        right_elbow_angle = calculate_angle(right_shoulder, right_elbow, right_wrist)

        # fuzzy logic
        if left_elbow_angle > 120:
           left_arm_status = 0  # stright
        if left_elbow_angle < 120 and left_elbow_angle > 60:
           left_arm_status = 1  # half-bent
        if left_elbow_angle < 60:
           left_arm_status = 2  # full-bent
        if right_elbow_angle > 120:
           right_arm_status = 0  # stright
        if right_elbow_angle < 120 and right_elbow_angle > 60:
           right_arm_status = 1  # half-bent
        if right_elbow_angle < 60:
           right_arm_status = 2  # full-bent

        # visualize angle
        cv2.putText(image,
                    f'{str(round(left_elbow_angle, 1))} {joint_status_description[left_arm_status]}',
                    tuple(np.multiply(left_elbow, [cap_width, cap_height]).astype(int)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 2, cv2.LINE_AA)
        cv2.putText(image,
                    f'{str(round(right_elbow_angle, 1))} {joint_status_description[right_arm_status]}',
                    tuple(np.multiply(right_elbow, [cap_width, cap_height]).astype(int)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 2, cv2.LINE_AA)

      except:
         pass

      # render detections
      mp_drawing.draw_landmarks(
        image,
        results.pose_landmarks,  # dot
        mp_pose.POSE_CONNECTIONS,  # line
        landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())  #change color of landmarks and connections

      # pop up on screen
      cv2.imshow('MediaPipe Pose', image)  # "Mediapipe Pose" is just a random name

      # quit if we close our screen or press 'q'
      if cv2.waitKey(5) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

 