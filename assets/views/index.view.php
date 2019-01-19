<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bandomoji Praktikos Uzduotis</title>
</head>

<style>
    html, body, div, canvas { padding: 0; margin: 0;}
    body {
        width: 100%;
    }
    #canvas {
        width: 400px;
        height: 500px;
        margin: 0 auto;
        padding: 0px;
        position: static;
        z-index: 1;
    }
    form {
        z-index: 2;
        width: 400px;
        margin: 0 auto;
        padding: 20px 0;
    }

    span {
        font-size: 0;
    }
</style>
<body>

    <form method="GET" action="id">
        <input type="text" name="shape_id" placeholder="file ID field">
        <button type="submit">Submit</button>
    </form>
    <br />

    <!--  Scena  -->
    <div id="canvas">

    </div>

    <script src="assets/scripts/three.js"></script>
    <script src="assets/scripts/orbit.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
            crossorigin="anonymous">
    </script>
    <script src="assets/scripts/index.js"></script>
</body>
</html>