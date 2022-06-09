# web_controller for bobik_robot


Made for A52s with display resolution 1080 x 2400 pixels, 20:9 ratio (~405 ppi density)

```
ros2 run bobik_robot bobik_robot
ros2 launch rosbridge_server rosbridge_websocket_launch.xml ssl:=true certfile:=/home/honza/projects/bobik/bobik_web/cert/server.crt keyfile:=/home/honza/projects/bobik/bobik_web/cert/server.key
```

```
PORT=3006 HTTPS=true SSL_CRT_FILE=cert/server.crt SSL_KEY_FILE=cert/server.key npm start
```

Open browser at: ```https://ha.doma:3006/dash````

