<?php

$key = key($_GET);
$id = $_GET[$key];

$figure = $app['database']->getFigure('figures', $id);

if(count($figure) > 0) {
    $name = $figure[0]->name;
    $color = $figure[0]->color;
    echo $name . ' ' . $color . ' ' . $id;
}