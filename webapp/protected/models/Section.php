<?php

/**
 * This is the model class for table "section".
 *
 * The followings are the available columns in table 'section':
 * @property string $id
 * @property string $parent_id
 * @property string $document_id
 * @property string $title
 * @property string $description
 * @property string $content
 * @property string $edited
 * @property string $edited_by
 * @property string $status_id
 * @property string $index
 *
 * The followings are the available model relations:
 * @property History[] $histories
 * @property Document $document
 * @property Section $parent
 * @property Section[] $sections
 * @property User $editedBy
 * @property Status $status
 * @property Tag[] $tags
 */
class Section extends CActiveRecord implements TreeNode
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'section';
	}

	/**
     *
     * 'document_id' is a required field of the database, if no document id is
     * available at the model will try a obtain one from the parent section.
     * @see Section::beforeSave()
     *
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('title', 'required'),
            array('index', 'numerical', 'integerOnly'=>true),
			array('parent_id, document_id, edited_by, status_id', 'length', 'max'=>20),
			array('title', 'length', 'max'=>100),
			array('description, content', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, parent_id, document_id, title, description, content, edited, edited_by, status_id', 'safe', 'on'=>'search'),
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
			'histories' => array(self::HAS_MANY, 'History', 'section_id'),
			'document' => array(self::BELONGS_TO, 'Document', 'document_id'),
			'parent' => array(self::BELONGS_TO, 'Section', 'parent_id'),
			'sections' => array(self::HAS_MANY, 'Section', 'parent_id'),
			'editedBy' => array(self::BELONGS_TO, 'User', 'edited_by'),
			'status' => array(self::BELONGS_TO, 'Status', 'status_id'),
			'tags' => array(self::MANY_MANY, 'Tag', 'section_tag(section_id, tag_id)'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'parent_id' => 'Parent',
			'document_id' => 'Document',
			'title' => 'Title',
			'description' => 'Description',
			'content' => 'Content',
			'edited' => 'Edited',
			'edited_by' => 'Edited By',
			'status_id' => 'Status',
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
		$criteria->compare('parent_id',$this->parent_id,true);
		$criteria->compare('document_id',$this->document_id,true);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('content',$this->content,true);
		$criteria->compare('edited',$this->edited,true);
		$criteria->compare('edited_by',$this->edited_by,true);
		$criteria->compare('status_id',$this->status_id,true);
        $criteria->compare('index',$this->index,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Section the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

    /**
     * Update the record fields before it is created.
     *
     * Each Section needs to know the document that is is attached to,
     * if the document id is not passed is during creation we can try
     * and look it up from the parent Section.
     *
     * @return bool
     */
    public function beforeSave() {
        if ($this->isNewRecord && $this->document_id == null){
            $this->document_id = $this->getParent()->document_id;
        }

        $this->edited = date('Y-m-d H:i:s');

        //todo
        //$this->edited_by = current user

        return parent::beforeSave();
    }

    public function getParent(){
        return Section::model()->findByPk($this->parent_id);
    }

    public function getChildren() {
        return Section::model()->findAll("parent_id = " . $this->id );
    }

    public function hasChildren() {
        return (count($this->getChildren()) > 0 ? true : false);
    }

    public function getIcon() {
        return "./images/16/section.png";
    }

    public function getDisplayName() {
        return $this->title;
    }

    /**
     * set the parent of this record
     *
     *
     *
     * @param $parent_type the parent model type, can be "Document" or "Section"
     * @param $parent_id the primafy key of the parent
     *
     * @return bool
     */
    public function setParent($parent_type, $parent_id) {
        if ($parent_type == 'Document') {
            $this->document_id = $parent_id;
        } else if($parent_type == 'Section'){
            $this->parent_id = $parent_id;
            $this->document_id = $this->getParent()->document_id;
        }else{
            return false;
        }
        return true;
    }

    public function getIndex(){
        return $this->index;
    }

    public function setIndex($index){
        return $this->index = $index;
    }

    public function isLeaf(){
        return !$this->hasChildren();
    }
}
