<?php

$data = file_get_contents('php://input');

$shape_column = substr($data, 0, 8);
$shape_id = substr($data, 9, 4);
$color_column = substr($data, 14, 5);
$color = substr($data, 20, 8);

$app['database']->changeColor('figures', $shape_column, $shape_id, $color_column, $color);