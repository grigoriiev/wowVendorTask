"use strict"
document.addEventListener("DOMContentLoaded", function(event) {

    window.character.run();

    let firstWalk=true;

    let positionObstacle=0;

    let positionObstacleSize=0;

    let characterPosition=0;

    let jumpDistance =0;

    let timeWalkSeconds=0;

    let timerId=0;

    let isWin=window.character.isWin;


    let sendData= function (positionObstacle,timeWalkSecondsResult, positionObstacleSize, jumpDistanceChar ,isWinChar){

        jumpDistance =0;

        if(isWinChar===false){

            isWinChar=0;
        }

        const formData = new FormData()

        formData.append('positionObstacle', positionObstacle)

        formData.append('timeWalkSecondsResult', timeWalkSecondsResult)

        formData.append('positionObstacleSize', positionObstacleSize)

        formData.append('isWinChar', isWinChar)

        formData.append('jumpDistanceChar', jumpDistanceChar)



        let status = function (response) {
            if (response.status !== 200) {

                return Promise.reject(new Error(response.statusText))
            }
            return Promise.resolve(response)
        }
        let json = function (response) {

            return response.json()
        }

        fetch("script.php", {
            method: "POST",
            body: formData,
        }).then(status)

          .then(json)

          .then(function (data) {

            console.log('data', data)

            })
          .catch(function (error) {

                console.log('error', error)

            })

       isWin=false;

        jumpDistance=0;
        timeWalkSeconds=0
        clearInterval(timerId);
    }


    let timerFunction= function() {

        timeWalkSeconds =timeWalkSeconds+1
    }

   let game= function() {

        if(window.character.characterPosition===0&&!firstWalk){

            window.character.run();

          sendData(positionObstacle,timeWalkSeconds, positionObstacleSize, jumpDistance,isWin);


        }


        if(window.character.characterPosition===0){

            timerId = setInterval(timerFunction, 1000);
        }

        if(window.character.characterPosition>10){

            firstWalk=false;
        }

        let positionScreen =window.terrain.rockPosition-window.terrain.rockSize-49;

        positionObstacle=window.terrain.rockPosition;

        positionObstacleSize=window.terrain.rockSize;

        characterPosition=window.character.characterPosition;

        if(window.character.characterPosition===positionScreen){

            window.character.jump();

            jumpDistance = positionScreen-positionObstacleSize;

        }
        if(window.character.characterPosition>1000){

            isWin=1;
        }
    }
    setInterval(game, 25);

} );
