import React, {useState, useEffect} from 'react';
import { Row, Col, Modal, Button, Card, Avatar, Checkbox } from 'antd';
import axios from 'axios';
import "./MethodFeed.css"
import DataArtifact from '..//artifacts/DataArtifact';
import HypoArtifact from '..//artifacts/HypoArtifact';

const SubmitMethod = (props) => {
      //These 2 variables are actually global variables
    const { Meta } = Card;
    const [methoddraft, setMethoddraft] = useState(false);
    const [methoddata, setMethoddata] = useState([]);
    const [methodhypo, setMethoddhypo] = useState(0);
    const [gethypo, setGethypo] = useState({
        "created_at" : "", "email_hypos" : "", "hypos" : "", "id" : ""
    });
    const get_a_data = {};
    const [getdata, setGetdata] = useState({
        "created_at" : "", "email_datas" : "", "datas" : "", "id" : ""
    });
    const [getdataone, setGetdataone] = useState({
        "created_at" : "", "email_datas" : "", "datas" : "", "id" : ""
    });
    const [getdatatwo, setGetdatatwo] = useState({
        "created_at" : "", "email_datas" : "", "datas" : "", "id" : ""
    });
    const [getdatathree, setGetdatathree] = useState({
        "created_at" : "", "email_datas" : "", "datas" : "", "id" : ""
    });
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [email, setEmail] = useState({
        email : ""
      });
      const onChangedraft = (e) => {
        setMethoddraft(true);
      };
    const getUser = async () => {
        const data = await axios.get(`http://127.0.0.1:5000/test`, { withCredentials: true })
        setEmail(data.data);
      }

    const showModal = () => {
        setVisible(true);
      };
    
    const handleOk = async () => {
        try {
            const method = await axios.put(`http://127.0.0.1:5000/method/${props.method.id}`)

            setConfirmLoading(true);
            setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
            }, 500);
        } catch (err) {
            console.error(err.message); 
            alert("Something Broke?!?");
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const fetchData = async () => { 
        const response = await axios.get(`http://127.0.0.1:5000//methoddatas/datas/${props.method.id}`)
        const datas = response.data.datalist
        //setGetdata(datas.data);
        try { setGetdataone(datas[0]); } catch {}
        try { setGetdatatwo(datas[1]); } catch {}
        try { setGetdatathree(datas[2]); } catch {}
        }

    const fetchHypo = async () => { 
        //console.log(hypoid);
        try {
        const data = await axios.get(`http://127.0.0.1:5000/methodhypo/hypo/${props.method.id}`)
        setGethypo(data.data.methodhypo);
        } catch {setGethypo({
            "created_at" : "", "email_hypos" : "", "hypos" : "", "id" : ""})}
    };

    useEffect(() => {
        getUser(); 
      }, [])
    return (
    <>
        <div> 
        <Row>
            <Col span={5}>
                <div className='right_end'>
                    <Button type="primary" onClick={() => { fetchData(); fetchHypo(); showModal();}}>Preview Method</Button>
                </div>
            </Col>

        </Row>
        </div>
        <Modal
        okText='Publish Method'
        title={props.method.title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1250}
        >
        <Checkbox onChange={onChangedraft}>Check this box to save as draft</Checkbox>
        <div
            style={{
            marginBottom: 25,
            }}>
            <Card bordered={false}>
                <Row>
                    { getdataone.id ? 
                    <Col span={8}>
                    <div className="artifact_section_smol">
                        <div className="data_artifact_smol">
                        <Card bordered={false} bodyStyle={{ padding: "5px"}}>
                        <Meta
                            avatar={<Avatar size={50}>{getdataone.email_datas}</Avatar>}
                            title={getdataone.created_at}
                        />
                            <h3 key={getdataone.id}>
                            { (getdataone.datas).length < 125?
                            (getdataone.datas)
                            :
                            ((getdataone.datas).substring(0, 125) + '...')
                            } 
                            </h3>
                        </Card>
                        </div>
                    </div>
                    </Col> : <div></div> }
                    { getdatatwo.id ?
                    <Col span={8}>
                    <div className="artifact_section_smol">
                        <div className="data_artifact_smol">
                        <Card bordered={false} bodyStyle={{ padding: "5px"}}>
                        <Meta
                            avatar={<Avatar size={50}>{getdatatwo.email_datas}</Avatar>}
                            title={getdatatwo.created_at}
                        />
                            <h3 key={getdatatwo.id}>
                            { (getdatatwo.datas).length < 125?
                            (getdatatwo.datas)
                            :
                            ((getdatatwo.datas).substring(0, 125) + '...')
                            }  
                            </h3>
                        </Card>
                        </div>
                    </div>
                    </Col> : <div></div> }
                    { getdatathree.id ? 
                    <Col span={8}>
                    <div className="artifact_section_smol">
                        <div className="data_artifact_smol">
                        <Card bordered={false} bodyStyle={{ padding: "5px"}}>
                        <Meta
                            avatar={<Avatar size={50}>{getdatathree.email_datas}</Avatar>}
                            title={getdatathree.created_at}
                        />
                            <h3 key={getdatathree.id}>
                            { (getdatathree.datas).length < 125?
                            (getdatathree.datas)
                            :
                            ((getdatathree.datas).substring(0, 125) + '...')
                            } 
                            </h3>
                        </Card>
                        </div>
                    </div>
                    </Col> : <div></div> }
                </Row>
            </Card>
            <br></br>
            <br></br>
                { gethypo.id ? 
                <div className="artifact_section">
                    <div className="hypo_artifact">
                    <Card bordered={false}>
                    <Meta
                        avatar={<Avatar size={60}>{gethypo.email_hypos}</Avatar>}
                        title={gethypo.created_at}
                    />
                        <h3 key={gethypo.id}>
                            {gethypo.hypos}  
                        </h3>
                    </Card>
                    </div>
                </div>
                : <div></div> }
        </div>
        </Modal>
    </>
    );
}

export default SubmitMethod;
