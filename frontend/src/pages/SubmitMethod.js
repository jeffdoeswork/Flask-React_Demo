import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'antd';

const SubmitMethod = () => {
      //These 2 variables are actually global variables
    const [methodtitle, setMethodtitle] = useState("");
    const [methoddata, setMethoddata] = useState(0);
    const [methodhypo, setMethoddhypo] = useState(0);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleChange = (e, field) => {
        setMethodtitle(e.target.value);
      }
    const showModal = () => {
        setVisible(true);
      };
    
    const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    console.log('You pressed the loading button');
    setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
    }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };

    return (
    <>
        <div className='entry_box'>
        <Button onClick={() => {setMethoddata(window.$datamethodid); setMethoddhypo(window.$hypomethodid); showModal();}}>Preview Method</Button>
            <form>
                <div className='entry_box'>
                    <input
                        onChange={(e) => handleChange(e, "methodtitle")}
                        type="text"
                        name="methodtitle"
                        id="methodtitle"
                        value={methodtitle}
                    />
                </div>
            </form>
        </div>
        <Modal
        title={methodtitle}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        >
        <p>{modalText}</p>
        <div>
            <h3>Data ID: {methoddata} and Hypo ID: {methodhypo}</h3>
        </div>
        </Modal>
    </>
    );
}

export default SubmitMethod;
