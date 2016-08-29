<!doctype html>
<html class="no-js" lang="en" ng-app="app">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Telosys Web</title>
    <meta name="description" content="Telosys Web">
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="lib/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <link href="lib/materialdesignicons/css/materialdesignicons.css" media="all" rel="stylesheet" type="text/css">
</head>

<body>

<div class="login without-backdrop">
    <div class="login-heading">
        <h4>Create an account</h4>
    </div>
    <div class="login-body">
        <form name="createAccountForm" action="/createAccount" method="POST">
            <div class="form-group">
                <div class="container container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                            <a href="/profile/github" class="btn btn-default btn-lg btn-github btn-block" role="button"><i class="fa fa-github fa-2x"></i>Sign in with GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <% if (request.getSession().getAttribute("error") != null) { %>
            <div class="form-group">
                <div class="alert alert-danger">
                    <% out.println(request.getSession().getAttribute("error")); %>
                </div>
            </div>
            <% } %>
            <div class="form-group">
                <input name="login" id="login" type="text" class="form-control input-lg" placeholder="Username" />
            </div>
            <div class="form-group">
                <input name="mail" id="mail" type="text" class="form-control input-lg" placeholder="Email Address" />
            </div>
            <div class="form-group">
                <input name="password1" id="password1" type="password" class="form-control input-lg" placeholder="Password" />
            </div>
            <div class="form-group">
                <input name="password2" id="password2" type="password" class="form-control input-lg" placeholder="Confirm Password" />
            </div>
            <button type="submit" class="btn btn-success btn-lg btn-block" role="button" data-reactid="86">Create an account</button>
        </form>
    </div>
</div>

</body>

</html>