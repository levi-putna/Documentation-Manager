<?php
/**
 * ApiController
 *
 * This class creat's an API that allows us to
 *
 * Get all items of a certain model
 * Get one single model item via its primary key (id)
 * Create a new item
 * Update an existing item
 * Delete an existing item.
 *
 * When using the API, use the following URL scheme:
 * View all : /api/<class> (HTTP method GET)
 * View a single : /api/<class>/<id> (also GET )
 * Create a new : /api/<class> (POST)
 * Update : /api/<class>/<id> (PUT)
 * Delete: /api/<class>/<id> (DELETE)
 *
 * @uses    Controller
 * @see     http://www.gen-x-design.com/archives/making-restful-requests-in-php/
 */
class StructuredAPIController extends Controller {


    private $config = array(

        'document' => array(
            'class' => 'Document',
        ),

        'section'  => array(
            'class' => 'Section',
        )

    );

    // {{{ *** Members ***
    /**
     * Key which has to be in HTTP USERNAME and PASSWORD headers
     */
    Const APPLICATION_ID = 'ASCCPE';

    private $format = 'json';

    /**
     * @return array action filters
     */
    public function filters() {
        return array();
    }

    public function actionIndex() {
        //todo
        echo CJSON::encode(array(1, 2, 3));
    }

    private function authenticate() {
        // Check if we have the USERNAME and PASSWORD HTTP headers set?
        if (!(isset($_SERVER['HTTP_X_USERNAME']) and isset($_SERVER['HTTP_X_PASSWORD']))) {
            // Error: Unauthorized
            $this->_sendErrorResponse(401, "Unauthorized");
        }

        $username = $_SERVER['HTTP_X_USERNAME'];
        $password = $_SERVER['HTTP_X_PASSWORD'];

        $identity = new UserIdentity($username, $password);
        if (!$identity->authenticate()) {
            $this->_sendErrorResponse(401, $this->_authenticateErrorCode($identity->errorCode));
        } else {
            $this->_sendResponse(200, CJSON::encode(array("success" => true, "account-id" => $identity->id, "account-name" => $identity->name)));
        }
    }

    private function getCriteria() {
        $criteria = new CDbCriteria;

        if (isset($_GET['sort'])) {
            $sort            = json_decode($_GET['sort'], true);
            $sort            = $sort[0];
            $criteria->order = "`" . $sort['property'] . "`" . " " . $sort['direction'];
        }

        if (isset($_GET['filter']) && isset($_GET['query'])) {
            $filter = json_decode($_GET['filter'], true);
            $filter = $filter[0];
            $criteria->compare($filter['property'], $_GET['query'], true);
        }

        if (isset($_GET['order'])) {
            $criteria->order = $_GET['order'];
        }

        if (isset($_GET['limit'])) {
            $criteria->limit = $_GET['limit'];
        }

        if (isset($_GET['page'])) {
            $criteria->offset = $_GET['page'];
        }

        if (isset($_GET['start'])) {
            $criteria->offset = $_GET['start'];
        }

        return $criteria;
    }


    /**
     * Retrieve a list of records for a particular model, it is possible to sort filter limit this size of the list.
     *
     * The following GET parameters can be past to
     * <ul>
     *  <li> <b>sort</b> Sorts the response data in the Store by one or more of its properties. Example format:
     * "property direction" </li>
     *  <li> <b>order</b></li>
     *  <li> <b>limit</b></li>
     *  <li> <b>page</b></li>
     *  <li> <b>start</b></li>
     * </ul>
     */
    public function actionList() {

        $criteria = $this->getCriteria();

        $count = 0;

        //get a list of models that can be created via in api request
        $safe_model_requests = $this->config;

        //get the model that is being requested to be created
        $request_model = $_GET['model'];

        switch ($_GET['model']) {
            case 'authenticate':
                $this->authenticate();
                break;
            default:

                //check if we can create a model for this type
                if (array_key_exists($request_model, $safe_model_requests)) {

                    $json = array();

                    $models = $safe_model_requests[$request_model]['class']::model()->findAll($criteria);
                    $this->getTreeEncode($models);

                    echo json_encode($json);
                } else {
                    $this->_sendErrorResponse(501, sprintf('The List method is not available for structured document %s', $_GET['model']));
                    exit;
                }
        }
    }

    /* Return a single record, requires that an ID
     * 
     * @access public
     * @return void
     */
    public function actionView() {
        //$this->_checkAuth();

        // Check if id was submitted via GET
        if (!isset($_GET['id'])) {
            $this->_sendErrorResponse(500, 'The id parameter is missing');
        }

        //get a list of models that can be created via in api request
        $safe_model_requests = $this->config;

        //get the model that is being requested to be created
        $request_model = $_GET['model'];

        $criteria = $this->getCriteria();

        //check if we can create a model for this type
        if (array_key_exists($request_model, $safe_model_requests)) {
            $node = $_GET['node'];
            $json = array();

            $pieces = explode("/", $node);
            $type   = $pieces[0];
            $id     = $pieces[1];
            $parent = $type::model()->findByPk($id);
            $this->getTreeEncode($parent->getChildren());

            echo json_encode($json);
        } else {
            $this->_sendErrorResponse(501, sprintf('Mode list is not implemented for model %s', $_GET['model']));
            exit;
        }


    }


    /**
     * Creates a new record
     *
     * @access public
     * @return void
     */
    public function actionCreate() {

        //get a list of models that can be created via in api request
        $safe_model_requests = $this->config;

        //get the model that is being requested to be created
        $request_model = $_GET['model'];

        //check if we can create a model of this type
        if ($request_model == 'document_tree') {
            //$model = new $safe_model_requests[$request_model]();
            if ($safe_model_requests[$request_model]['type']) {

                $fields = json_decode(file_get_contents("php://input"), true);

                $pieces = explode("-", $fields['id']);
                $type   = $pieces[0];
                $id     = $pieces[1];

                $pieces      = explode("-", $fields['parentId']);
                $parent_type = $pieces[0];
                $parent_id   = $pieces[1];

                $model = $type::model()->findByPk($id);
                $model->setParent($parent_type, $parent_id);

                if ($model->save()) {
                    $this->_sendResponse(200, $this->_getObjectEncoded($_GET['model'], $model->attributes));
                } else {
                    $msg = sprintf("Couldn't update model %s", $_GET['model']);

                    $this->_sendErrorResponse(500, $msg);
                }
                exit;
            }
        } else {
            //check if we can create a model of this type
            if (array_key_exists($request_model, $safe_model_requests)) {
                $model = new $safe_model_requests[$request_model]['class']();
            } else {
                $this->_sendErrorResponse(501, sprintf('Mode create is not implemented for model %s', $_GET['model']));
                exit;
            }
        }

        //makesure we are adding as the current user.
        $fields = json_decode(file_get_contents("php://input"), true);

        // Try assign values to attributes.
        foreach ($fields as $var => $value) {

            // Does the model have this attribute?, if not just ignore it
            if ($model->hasAttribute($var)) {
                $model->$var = $value;
            } else {
                // No, raise an error
                //$this->_sendErrorResponse(500, sprintf('Parameter %s is not allowed for model %s', $var, $_GET['model']));
            }
        }
        // Try to save the model
        if ($model->save()) {
            // Saving was OK
            $this->_sendResponse(200, $this->_getObjectEncoded($_GET['model'], $model->attributes));
        } else {

            $msg = sprintf("Couldn't create model %s", $_GET['model']);
            $msg .= "\n";
            foreach ($model->errors as $attribute => $attr_errors) {
                $msg .= "\nAttribute: $attribute";
                $msg .= "\n";
                foreach ($attr_errors as $attr_error) {
                    $msg .= "\n    $attr_error";
                }
            }
            $this->_sendErrorResponse(500, $msg);
        }

        var_dump($_REQUEST);
    }


    /**
     * Update a single record
     *
     * @access public
     * @return void
     */
    public function actionUpdate() {
        //$this->_checkAuth();


        // Check if id was submitted via GET
        if (!isset($_GET['id'])) {
            $this->_sendErrorResponse(500, 'The id parameter is missing');
        }

        //makesure we are adding as the current user.
        $fields = json_decode(file_get_contents("php://input"), true);

        //get a list of models that can be created via in api request
        $safe_model_requests = $this->config;

        //get the model that is being requested to be created
        $request_model = $_GET['model'];

        echo "--->" . is_array($fields);

        //check if we can create a model of this type
        if (array_key_exists($request_model, $safe_model_requests)) {
            //$model = new $safe_model_requests[$request_model]();
            $model = $safe_model_requests[$request_model]['class']::model()->findByPk($_GET['id']);
        } else {
            $this->_sendErrorResponse(501, sprintf('Method view is not implemented for %s', $_GET['model']));
            exit;
        }

        if (is_null($model)) {
            $this->_sendErrorResponse(400, sprintf("Didn't find any model %s with ID %s.", $_GET['model'], $_GET['id']));
            exit;
        }


        // Try assign values to attributes.
        foreach ($fields as $var => $value) {

            // Does the model have this attribute?, if not just ignore it
            if ($model->hasAttribute($var)) {
                $model->$var = $value;
            } else {
                // No, raise an error
                //$this->_sendErrorResponse(500, sprintf('Parameter %s is not allowed for model %s', $var, $_GET['model']));
            }
        }

        // Try to save the model
        if ($model->save()) {
            $this->_sendResponse(200, $this->_getObjectEncoded($_GET['model'], $model->attributes));
        } else {
            $msg = sprintf("Couldn't update model %s", $_GET['model']);
            $msg .= "\n";
            foreach ($model->errors as $attribute => $attr_errors) {
                $msg .= "\nAttribute: $attribute";
                $msg .= "\n";
                foreach ($attr_errors as $attr_error) {
                    $msg .= "\n    $attr_error";
                }
            }

            $this->_sendErrorResponse(500, $msg);
        }
    }


    /**
     * Deletes a single record
     *
     * @access public
     * @return void
     */
    public function actionDelete() {
        //$this->_checkAuth();

        //get a list of models that can be created via in api request
        $safe_model_requests = $this->config;

        //get the model that is being requested to be created
        $request_model = $_GET['model'];

        //check if we can create a model of this type
        if (array_key_exists($request_model, $safe_model_requests)) {
            $model = $safe_model_requests[$request_model]['class']::model()->findByPk($_GET['id']);
        } else {
            $this->_sendErrorResponse(501, sprintf('method delete is not implemented for model %s', $_GET['model']));
            exit;
        }

        // Was a model found?
        if (is_null($model)) {
            // No, raise an error
            $this->_sendResponse(400, sprintf("Error: Didn't find any model <b>%s</b> with ID <b>%s</b>.", $_GET['model'], $_GET['id']));
        }

        // Delete the model
        $num = $model->delete();
        if ($num > 0) {
            $this->_sendResponse(200, sprintf("Model <b>%s</b> with ID <b>%s</b> has been deleted.", $_GET['model'], $_GET['id']));
        } else {
            $this->_sendResponse(500, sprintf("Error: Couldn't delete model <b>%s</b> with ID <b>%s</b>.", $_GET['model'], $_GET['id']));
        }
    }


    public function actionCapabilities() {
        $this->_sendErrorResponse(400, "no implementation");
        exit;
    }


    /**
     * Sends the API response
     *
     * @param int    $status
     * @param string $body
     * @param string $content_type
     *
     * @access private
     * @return void
     */
    private function _sendResponse($status = 200, $body = '', $content_type = 'text/html') {
        $status_header = 'HTTP/1.1 ' . $status . ' ' . $this->_getStatusCodeMessage($status);
        // set the status
        header($status_header);
        // set the content type
        header('Content-type: ' . $content_type);

        // pages with body are easy
        if ($body != '') {
            // send the body
            echo $body;
            exit;
        } // we need to create the body if none is passed
        else {
            // create some body messages
            $message = '';

            // this is purely optional, but makes the pages a little nicer to read
            // for your users.  Since you won't likely send a lot of different status codes,
            // this also shouldn't be too ponderous to maintain
            switch ($status) {
                case 401:
                    $message = 'You must be authorized to view this page.';
                    break;
                case 404:
                    $message = 'The requested URL ' . $_SERVER['REQUEST_URI'] . ' was not found.';
                    break;
                case 500:
                    $message = 'The server encountered an error processing your request.';
                    break;
                case 501:
                    $message = 'The requested method is not implemented.';
                    break;
            }

            // servers don't always have a signature turned on (this is an apache directive "ServerSignature On")
            $signature = ($_SERVER['SERVER_SIGNATURE'] == '') ? $_SERVER['SERVER_SOFTWARE'] . ' Server at ' . $_SERVER['SERVER_NAME'] . ' Port ' . $_SERVER['SERVER_PORT'] : $_SERVER['SERVER_SIGNATURE'];

            // this should be templatized in a real-world solution
            $body = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
                        <html>
                            <head>
                                <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
                                <title>' . $status . ' ' . $this->_getStatusCodeMessage($status) . '</title>
                            </head>
                            <body>
                                <h1>' . $this->_getStatusCodeMessage($status) . '</h1>
                                <p>' . $message . '</p>
                                <hr />
                                <address>' . $signature . '</address>
                            </body>
                        </html>';

            echo $body;
            exit;
        }
    }

    /**
     * Gets the message for a status code
     *
     * @param mixed $status
     *
     * @access private
     * @return string
     */
    private function _getStatusCodeMessage($status) {
        // these could be stored in a .ini file and loaded
        // via parse_ini_file()... however, this will suffice
        // for an example
        $codes = Array(
            100 => 'Continue',
            101 => 'Switching Protocols',
            200 => 'OK',
            201 => 'Created',
            202 => 'Accepted',
            203 => 'Non-Authoritative Information',
            204 => 'No Content',
            205 => 'Reset Content',
            206 => 'Partial Content',
            300 => 'Multiple Choices',
            301 => 'Moved Permanently',
            302 => 'Found',
            303 => 'See Other',
            304 => 'Not Modified',
            305 => 'Use Proxy',
            306 => '(Unused)',
            307 => 'Temporary Redirect',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            406 => 'Not Acceptable',
            407 => 'Proxy Authentication Required',
            408 => 'Request Timeout',
            409 => 'Conflict',
            410 => 'Gone',
            411 => 'Length Required',
            412 => 'Precondition Failed',
            413 => 'Request Entity Too Large',
            414 => 'Request-URI Too Long',
            415 => 'Unsupported Media Type',
            416 => 'Requested Range Not Satisfiable',
            417 => 'Expectation Failed',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            504 => 'Gateway Timeout',
            505 => 'HTTP Version Not Supported'
        );

        return (isset($codes[$status])) ? $codes[$status] : '';
    }


    /**
     * Checks if a request is authorized
     *
     * @access private
     * @return void
     */
    private function _checkAuth() {
        // Check if we have the USERNAME and PASSWORD HTTP headers set?
        if (!(isset($_SERVER['HTTP_X_USERNAME']) and isset($_SERVER['HTTP_X_PASSWORD']))) {
            // Error: Unauthorized
            $this->_sendErrorResponse(401, "Unauthorized");
        }

        $username = $_SERVER['HTTP_X_USERNAME'];
        $password = $_SERVER['HTTP_X_PASSWORD'];

        $identity = new UserIdentity($username, $password);
        if (!$identity->authenticate()) {
            $this->_sendErrorResponse(401, $this->_authenticateErrorCode($identity->errorCode));
        }

    }

    private function _authenticateErrorCode($status) {
        $codes = Array(
            1   => 'Invalid Username',
            2   => 'Invalid Password',
            3   => 'Invalid Email Address',
            4   => 'Account not active',
            5   => 'Account banned',
            100 => 'Unknown account',
        );
        return (isset($codes[$status])) ? $codes[$status] : '';
    }

    private function getTreeEncode($models, $follow = true) {
        $rows = array();
        foreach ($models as $model) {
            $isLeafe = ($follow ? $model->isLeaf() : true);
            $rows[]  = array("text" => $model->getDisplayName(), "icon" => $model->getIcon(), "object_type" => get_class($model), "object_id" => $model->id, "id" => strtolower(get_class($model)) . '/' . $model->id, "loaded" => $isLeafe, "cls" => "", "disabled" => true, "order" => $model->getOrder());
        }
        //"expanded"

        $this->_sendResponse(200, CJSON::encode($rows));

    }

    /**
     * Returns the json or xml encoded array
     *
     * @param mixed $model
     * @param mixed $array Data to be encoded
     *
     * @access private
     * @return void
     */
    private function _getObjectEncoded($model, $array) {
        if (isset($_GET['format'])) {
            $this->format = $_GET['format'];
        }

        if ($this->format == 'json') {
            return CJSON::encode($array);
        } elseif ($this->format == 'xml') {
            $result = '<?xml version="1.0">';
            $result .= "\n<$model>\n";
            foreach ($array as $key => $value) {
                $result .= "    <$key>" . utf8_encode($value) . "</$key>\n";
            }
            $result .= '</' . $model . '>';
            return $result;
        } else {
            return;
        }
    }

    private function _sendErrorResponse($code, $message) {
        $this->_sendResponse($code, CJSON::encode(array("error" => $code, "message" => $message)));
    }
}

?>
