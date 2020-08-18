<?php
$fp = fopen('results.json', 'w');
fwrite($fp, $_POST['json']);
fclose($fp);