<?php

/**
 * This is the model class for table "document".
 *
 * The followings are the available columns in table 'document':
 * @property string $id
 * @property string $title
 * @property string $descrription
 * @property integer $index
 *
 * The followings are the available model relations:
 * @property Section[] $sections
 */
class Document extends CActiveRecord implements TreeNode
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'document';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('title', 'required'),
            array('index', 'numerical', 'integerOnly'=>true),
			array('title', 'length', 'max'=>100),
			array('descrription', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, title, descrription, order', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'sections' => array(self::HAS_MANY, 'Section', 'document_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'title' => 'Title',
			'descrription' => 'Descrription',
            'index' => 'Index',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('descrription',$this->descrription,true);
        $criteria->compare('index',$this->index);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Document the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

    public function getChildren() {
        return Section::model()->findAll("parent_id IS NULL AND document_id = " . $this->id);
    }

    public function hasChildren() {
        return (count($this->getChildren()) > 0 ? true : false);
    }

    public function getIcon() {
        return "./images/16/document.png";
    }

    public function getDisplayName() {
        return $this->title;
    }

    public function setParent($parent_type, $parent_id) {
        return false;
    }

    public function isLeaf(){
        return !$this->hasChildren();
    }

    public function getOrder(){
        return $this->index;
    }
}
