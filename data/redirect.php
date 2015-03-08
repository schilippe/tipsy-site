<?php

  $parts = explode('/', $_SERVER['REQUEST_URI']);
  $redirect = urldecode($parts[2]);
  $email = urldecode($parts[3]);
  $amount = urldecode($parts[4]);
  $cancel = $parts[5];

  $redirect = str_replace('$', '/', $redirect);

  $args = array(
    redirect => $redirect,
    email    => $email,
    amount   => $amount
  );

  if ($cancel == 'cancel') {
    $args['error'] = 'failure';
    $args['error_description'] = 'Cancelled donation';
  }

  if (strpos($redirect, 'resource') === 0) {
    header('Content-Type: text/html');                                    
    echo '<script>history.go((history.length-1)*-1);</script>';
    return;
  }

  if (strpos($redirect, 'chrome-extension') === 0) {
    $params = http_build_query($args);

    header('Content-Type: text/plain');
    header('Location: ' . $redirect . '?' . $params, 302);

    echo 'Redirecting to ' . $redirect;

    return;
  }

  http_response_code(500);

?>
