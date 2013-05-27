<?php
$this->pageTitle = Yii::app()->name . ' - ' . UserModule::t("Login");
?>

<?php
$form = $this->beginWidget(
    'bootstrap.widgets.TbActiveForm',
    array(
         'id'          => 'verticalForm',
         'htmlOptions' => array(),
    )
); ?>

<h1 class="page-title">Welcome Back, please log in</h1>

<div style="position: relative; top: auto; left: auto; right: auto; margin: 0 auto 20px; z-index: 1; max-width: 100%;"
     class="modal">
    <div class="modal-header">
        <h3>Login</h3>
    </div>
    <div class="modal-body">

        <?php if (Yii::app()->user->hasFlash('loginMessage')): ?>
        <div class="alert alert-success">
            <?php echo Yii::app()->user->getFlash('loginMessage'); ?>
        </div>
        <?php endif; ?>

        <div class="row-fluid">
            <div class="span6">

                <?php echo $form->textFieldRow($model, 'username', array('class' => 'input-large')); ?>

                <?php echo $form->passwordFieldRow($model, 'password', array('class' => 'input-large')); ?>

                <?php echo $form->checkboxRow($model, 'rememberMe'); ?>
            </div>
            <div class="span6">
                <p>
                    Not A member yet?<br/>
                    <?php echo CHtml::link(UserModule::t("Register"), Yii::app()->getModule('user')->registrationUrl); ?>
                </p>

                <p>
                    Forgotten or lost your password?<br/>
                    <?php echo CHtml::link(UserModule::t("Lost Password?"), Yii::app()->getModule('user')->recoveryUrl); ?>
                </p>

            </div>
        </div>

    </div>
    <div class="modal-footer">
        <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType' => 'button', 'type' => 'danger', 'url' => Yii::app()->createUrl("/site/index"), 'label' => 'Cancel' )); ?>
        <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType'=>'submit', 'label'=>'Login')); ?>
    </div>
</div>

<?php $this->endWidget(); ?>

<?php
$form = new CForm(
    array(
         'elements' => array(
             'username'   => array(
                 'type'      => 'text',
                 'maxlength' => 32,
             ),
             'password'   => array(
                 'type'      => 'password',
                 'maxlength' => 32,
             ),
             'rememberMe' => array(
                 'type' => 'checkbox',
             )
         ),

         'buttons'  => array(
             'login' => array(
                 'type'  => 'submit',
                 'label' => 'Login',
             ),
         ),
    ),
    $model);
?>