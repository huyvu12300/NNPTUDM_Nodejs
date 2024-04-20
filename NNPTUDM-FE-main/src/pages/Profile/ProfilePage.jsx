import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserService"
import { useMutationHooks } from "../../hooks/usrMutationHook";
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from "../../redux/slides/userSlide";
import { Button, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from "../../utils";

const ProfilePage = () =>{
    const user = useSelector((state) => state.user)
    const[email, setEmail] = useState('')
    const[name, setName] = useState('')
    const[phone, setPhone] = useState('')
    const[address, setAddress] = useState('')
    const[avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const {id, access_token, ...rests} = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const dispatch = useDispatch()
    const {data, isLoading, isSuccess, isError} = mutation

    useEffect(() =>{
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() =>{
        if(isSuccess){
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
            
        }else if(isError){
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) =>{
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token : token}))
    }

    const handleOnchangeEmail = (value) =>{
        setEmail(value)
    }
    const handleOnchangeName = (value) =>{
        setName(value)
    }
    const handleOnchangePhone = (value) =>{
        setPhone(value)
    }
    const handleOnchangeAddress = (value) =>{
        setAddress(value)
    }
    const handleOnchangeAvatar = async({fileList}) =>{
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    const handleUpdate = ()=>{
        mutation.mutate({id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token})

    }
    return(
        <div style={{padding: '0 120px', margin: '0 auto'}}> 
            <WrapperHeader>
                Thông tin người dùng
            </WrapperHeader>
            <Loading isLoading={isLoading}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Họ và tên</WrapperLabel>
                        <InputFormComponent id="name" value={name} onChange={handleOnchangeName}/>   
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '40px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputFormComponent id="email" value={email} onChange={handleOnchangeEmail}/>   
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '40px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
                        <InputFormComponent id="phone" value={phone} onChange={handleOnchangePhone}/>   
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '40px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
                        <InputFormComponent id="address" value={address} onChange={handleOnchangeAddress}/>   
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '40px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Hình ảnh</WrapperLabel>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="ảnh đại diện"/>
                        )}
                        {/* <InputFormComponent id="avatar" value={avatar} onChange={handleOnchangeAvatar}/>    */}
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '40px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>

        </div>
    )
}

export default ProfilePage