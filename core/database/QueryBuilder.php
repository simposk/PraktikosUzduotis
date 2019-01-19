<?php

class QueryBuilder
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getFigure($table, $id) {
        $sql = sprintf("select * from `%s` where `%s`='%s'",
            $table, 'shape_id', $id . '.obj'
        );

        try {
            $statement = $this->pdo->prepare($sql);

            $statement->execute();

            $figure = $statement->fetchAll(PDO::FETCH_CLASS);

            return $figure;

        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function changeColor($table, $shape_column, $shape_id, $color_column, $color) {
        $sql = sprintf("UPDATE `%s` SET `%s`='%s', `%s`='%s' WHERE `%s`='%s'",
            $table,
            $color_column,
            $color,
            'color_changed',
            '1',
            $shape_column,
            $shape_id . '.obj'
        );

        try {
            $statement = $this->pdo->prepare($sql);
            var_dump($statement);
            $statement->execute();
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}