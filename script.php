<?php
require_once 'rb.php';
require_once 'connection.php';



if( isset($_POST["positionObstacle"])&&
    isset($_POST["timeWalkSecondsResult"])&&
    isset($_POST["positionObstacleSize"])&&
    isset($_POST["isWinChar"])&&
    isset($_POST["jumpDistanceChar"]))
{

    $game = R::dispense('game');

    $game->positionObstacle = (integer)strip_tags(trim($_POST["positionObstacle"]));

    $game->timeWalkSecondsResult = (integer)strip_tags(trim($_POST['timeWalkSecondsResult']));

    $game->positionObstacleSize = (integer)strip_tags(trim($_POST['positionObstacleSize']));

    $game->isWinChar = (integer)strip_tags(trim($_POST['isWinChar']));

    $game->jumpDistanceChar = (integer)strip_tags(trim($_POST['jumpDistanceChar']));


    $id = R::store($game);


    R::close();

    echo json_encode(['ок'=>"good"]);

}else{

    echo json_encode(['fail'=>"bad"]);
}


