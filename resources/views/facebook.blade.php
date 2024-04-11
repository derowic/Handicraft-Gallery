<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Posts</title>
</head>
<body>
    <h1>Facebook Posts</h1>
    <ul>
        @foreach ($posts as $post)
            <li>{{ $post['message'] }}</li>
        @endforeach
    </ul>
</body>
</html>
