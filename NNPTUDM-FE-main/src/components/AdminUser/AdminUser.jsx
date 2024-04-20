import React from "react";
import { WrapperHeader } from "../AdminUser/style";
import { Button } from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import * as UserService from "../../service/UserService"
import { useQuery } from "@tanstack/react-query";

const AdminUser = () =>{

    const getAllUser = async() =>{
        const res = await UserService.getAllUser()
        console.log('res'. res)
        return res
    }

    const { isLoading: isLoadingUser, data: users } = useQuery({queryKey:['users'], queryFn:getAllUser})


    const dataTable = users?.data.length && users?.data.map((user) =>{
        return {...user, key: user._id}
    })
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text) => <a>{text}</a>,
        },
    ];
    return(
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '10px'}}>
                <Button style={{height: '100px', width: '100px', borderRadius: '6px', borderStyle: 'dashed'}}><PlusOutlined /></Button>
            </div>
            <div style={{ marginTop: '20px'}}>
                <TableComponent columns={columns} isLoading={isLoadingUser} data={dataTable}/>
            </div>
        </div>
    )
}

export default AdminUser