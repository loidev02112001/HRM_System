<template>
  <div className="employess__section">
    <div className="file__actions">
      <div className="download__btn">
        Tải xuống excel
        <CloudDownloadOutlined />
      </div>
      <div className="upload__btn">
        Tải lên file
        <CloudUploadOutlined />
        <input type="file" accept=".xlsx, .xls, .csv" @change="handleChangeFile" />
      </div>
    </div>
    <div className="employees__action">
      <CustomInput type="search" placeholder="Tìm kiếm" className="employees__search-inp" v-model:value="textSearch" />
      <CustomButton className="employees__search-btn" text="Thêm nhân viên" @handle-click="handleOpenAddModal">
        <PlusOutlined v-slot:rightIcon />
      </CustomButton>
    </div>
    <div className="employees__container">
      <!-- <Table columns={columns} dataSource={provideDatasource()} scroll={{ y: 'calc(100vh - 420px)' , x: 'max-content' }}
        rowKey={record=> record._id}
        pagination={true}
        locale={locale}
        /> -->
      <a-table :dataSource="provideDatasource" :columns="columns"></a-table>
    </div>
    <!-- <Modal title="Thêm nhân viên" wrapClassName="add__employees-modal" okText="Thêm" cancelText="Huỷ" open={isModalOpen}
      onOk={()=> {
      handleAddEmployees();
      }}
      onCancel={() => {
      refreshInputValue();
      setIsModalOpen(false);
      }}
      >
      <div className="add_employees_modal">
        <div className="add__employees_left">
          <div className="add__employees-label">Tên:</div>
          <CustomInput maxLength={50} onChange={e=> setEmployeeName(e.target.value)}
            value={employeeName}
            placeholder="Tên nhân viên"
            />
            <div className="add__employees-label">Email:</div>
            <CustomInput maxLength={50} type="email" onChange={e=> setEmployeeEmail(e.target.value)}
              value={employeeEmail}
              placeholder="Email"
              />
              <div className="add__employees-label">Điện thoại:</div>
              <CustomInput value={number} onChange={restrictAlphabets.bind()} type="number" maxLength={10}
                placeholder="Điện thoại" />
              <div className="add__employees-label">Chức vụ:</div>
              <CustomInput maxLength={50} onChange={e=> setEmployeePosition(e.target.value)}
                value={employeePosition}
                placeholder="Chức vụ"
                />
                <div className="add__employees-selectts">
                  <div className="add__employees-label">Phòng ban:</div>
                  <Select value={department} onChange={value=> setDepartment(value)}
                    placeholder="Phòng ban"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
                    notFoundContent={'Không có dữ liệu'}
                    >
                    {departmentList.map((list, idx) => {
                    return (
                    <Option key={idx} value={list._id}>
                      {list.name}
                    </Option>
                    );
                    })}
                  </Select>
                  <div className="add__employees-label">Quyền lợi:</div>
                  <Select value={benefit} onChange={value=> setBenefit(value)}
                    placeholder="Quyền lợi"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
                    notFoundContent={'Không có dữ liệu'}
                    >
                    {benefitList.map((list, idx) => {
                    return (
                    <Option key={idx} value={list._id}>
                      {list.name}
                    </Option>
                    );
                    })}
                  </Select>
                </div>
        </div>
        <div className="add__employees_right">
          <div className="add__employees-label">Giới tính:</div>
          <Select placeholder="Giới tính" value={employeeGender} onChange={e=> setEmployeeGender(e)}>
            <Option key={'male__gender'} value={'nam'}>
              Nam
            </Option>
            <Option key={'female__gender'} value={'nữ'}>
              Nữ
            </Option>
          </Select>
          <div className="add__employees-label">Mã nhân viên:</div>
          <CustomInput maxLength={50} ref={employeesCodeRef} placeholder="Mã nhân viên" value={randomText(6)} disabled />
          <div className="add__employees-label">Địa chỉ: </div>
          <CustomInput maxLength={50} onChange={e=> setEmployeeAddress(e.target.value)}
            value={employeeAddress}
            placeholder="Địa chỉ"
            />
            <div className="add__employees-label">Bậc lương: </div>
            <InputNumber type={'number'} defaultValue={salaryRanks} onChange={value=> setSalaryRanks(value)} />
              <div className="add__employees-label">Khoa: </div>
              <CustomInput maxLength={50} onChange={e=> setEmployeeFaculty(e.target.value)}
                value={employeeFaculty}
                placeholder="Tên khoa"
                />
        </div>
      </div>
    </Modal> -->

    <!-- <Modal title="Cập nhật nhân viên" open={editModalOpen} onOk={()=> handleUpdateEmployees()}
      onCancel={() => setEditModalOpen(false)}
      okText="Sửa"
      cancelText="Huỷ"
      >
      <div className="update__emp-container">
        <div className="add__employees_left">
          <div className="add__employees-label">Tên:</div>
          <CustomInput maxLength={50} value={selectedEmployee.name} onChange={e=> setSelectedEmployee({
            ...selectedEmployee, name: e.target.value })}
            placeholder="Tên nhân viên"
            />
            <div className="add__employees-label">Email:</div>
            <CustomInput maxLength={50} value={selectedEmployee.email} onChange={e=> setSelectedEmployee({
              ...selectedEmployee, email: e.target.value })}
              placeholder="Email"
              />
              <div className="add__employees-label">Điện thoại:</div>
              <CustomInput maxLength={10} type="number" value={selectedEmployee.phoneNumber} onChange={e=> {
                let phoneNumber = e.target.value.replace(/\D/g, '');
                setSelectedEmployee({ ...selectedEmployee, phoneNumber: phoneNumber });
                }}
                placeholder="Điện thoại"
                />
                <div className="add__employees-label">Chức vụ:</div>
                <CustomInput value={selectedEmployee.position} onChange={e=> setSelectedEmployee({ ...selectedEmployee,
                  position: e.target.value })}
                  placeholder="Chức vụ"
                  />
                  <div className="add__employees-label">Ngày bắt đầu:</div>
                  <DatePicker format="YYYY-MM-DD" value={selectedEmployee.startDate ? dayjs(selectedEmployee.startDate) :
                    null} size={'middle'} onChange={(_, dateString)=> {
                    setSelectedEmployee({ ...selectedEmployee, startDate: dateString });
                    }}
                    />
        </div>
        <div className="add__employees_right">
          <div className="add__employees-label">Giới tính:</div>
          <Select placeholder="Giới tính" value={selectedEmployee.gender} onChange={e=> setSelectedEmployee({
            ...selectedEmployee, gender: e })}
            >
            <Option key={'male__gender'} value={'nam'}>
              Nam
            </Option>
            <Option key={'female__gender'} value={'nữ'}>
              Nữ
            </Option>
          </Select>
          <div className="add__employees-label">Địa chỉ: </div>
          <CustomInput value={selectedEmployee.address} onChange={e=> setSelectedEmployee({ ...selectedEmployee, address:
            e.target.value })}
            placeholder="Địa chỉ"
            />
            <div className="add__employees-label">Bậc lương: </div>
            <InputNumber value={selectedEmployee.salaryRank} onChange={value=> setSelectedEmployee({ ...selectedEmployee,
              salaryRank: value })}
              type={'number'}
              />
              <div className="add__employees-selects">
                <div className="add__employees-label">Phòng ban:</div>
                <Select showSearch optionFilterProp="children" filterOption={(input, option)=> (option?.children ??
                  '').toLowerCase().includes(input.toLowerCase())}
                  value={selectedEmployee?.departMentId?.[0]?._id}
                  onChange={value => {
                  setSelectedEmployee({
                  ...selectedEmployee,
                  departMentId: departmentList.filter(dp => dp._id === value)
                  });
                  }}
                  placeholder="Phòng ban"
                  >
                  {departmentList.map((list, idx) => {
                  return (
                  <Option key={idx} value={list._id}>
                    {list.name}
                  </Option>
                  );
                  })}
                </Select>
                <div className="add__employees-label">Quyền lợi:</div>
                <Select showSearch optionFilterProp="children" filterOption={(input, option)=> (option?.children ??
                  '').toLowerCase().includes(input.toLowerCase())}
                  value={selectedEmployee?.benefitId?.[0]?._id || selectedEmployee?.benefitId?.[0]}
                  onChange={value => {
                  setSelectedEmployee({
                  ...selectedEmployee,
                  benefitId: benefitList.filter(bnf => bnf._id === value)
                  });
                  }}
                  placeholder="Quyền lợi"
                  >
                  {benefitList.map((list, idx) => {
                  return (
                  <Option key={idx} value={list._id}>
                    {list.name}
                  </Option>
                  );
                  })}
                </Select>
              </div>
              <div className="add__employees-label">Khoa:</div>
              <CustomInput maxLength={50} value={selectedEmployee.faculty} onChange={e=> setSelectedEmployee({
                ...selectedEmployee, faculty: e.target.value })}
                placeholder="Tên Khoa"
                />
        </div>
      </div>
    </Modal> -->
    <!-- <Modal title="Xoá nhân viên" wrapClassName="delete__employees-modal" open={deleteModalOpen} onOk={()=>
      handleDeleteEmployees()}
      onCancel={() => setDeleteModalOpen(false)}
      okText="Xoá"
      cancelText="Huỷ"
      >
      <p>Bạn có thật sự muốn xoá nhân viên</p>
    </Modal> -->
  </div>
</template>

<script setup>
import { ref, computed,watch } from 'vue';
import { CloudDownloadOutlined, CloudUploadOutlined, PlusOutlined } from '@ant-design/icons-vue'
import CustomInput from '@/components/CustomInput.vue';
import { useGetEmployeeMutation } from '@/api/employees/getEmployeeExcel'
import CustomButton from '@/components/CustomButton.vue';
import { removeTimeFromDate } from '@/utils';
import { translateStatus } from '@/utils';
import { useGetBenefit } from '@/api/benefit/getBenefit';
import { useGetDepartment } from '@/api/departments/getDepartment';
import { useGetEmployee } from '@/api/employees/getEmployee';


const textSearch = ref('')
const visible = ref(false)
const provideDatasource = ref([])

const { data: listBenefit } = useGetBenefit()
const { data: listDepartment } = useGetDepartment()
const { data: listEmployees } = useGetEmployee()

const columns = [
  {
    title: 'Mã nhân viên',
    dataIndex: 'codeEmployee',
    key: 'codeEmployee',
    width: 200,
    // customRender: (codeEmployee) => {
    //   return <span class="employee__position">{{ codeEmployee }}</span>;
    // }
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    // customRender: (text) => {
    //   return <span class="employee__name">{{ text }}</span>;
    // }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 300
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: 150,
    // customRender: (phoneNumber) => {
    //   return <span class="employee__phone">{{ phoneNumber }}</span>;
    // }
  },
  {
    title: 'Địa chỉ',
    key: 'address',
    dataIndex: 'address',
    width: 150,
    // customRender: (address) => {
    //   return <span class="employee__address">{{ address }}</span>;
    // }
  },
  {
    title: 'Bậc lương',
    dataIndex: 'salaryRank',
    key: 'salaryRank',
    width: 100,
    // customRender: (salaryRank) => {
    //   return <span class="employee__salary">{{ salaryRank }}</span>;
    // }
  },
  {
    title: 'Chức vụ',
    key: 'position',
    dataIndex: 'position',
    width: 150,
    // customRender: (item) => item
  },
  {
    title: 'Khoa',
    key: 'faculty',
    dataIndex: 'faculty',
    width: 150
  },
  {
    title: 'Ngày làm việc',
    key: 'startDate',
    dataIndex: 'startDate',
    width: 150,
    // customRender: (startDate) => {
    //   return <span class="employee__birthday">{{ removeTimeFromDate(startDate) }}</span>;
    // }
  },
  {
    title: 'Tình trạng hoạt động',
    key: 'status',
    dataIndex: 'status',
    width: 200,
    // customRender: (status) => {
    //   const statusClass = ()=>{
    //     if(status === 'inActive'){
    //       return 'employee__inactive'
    //     }else if(status?.toLowerCase() === 'active'){
    //       return 'employee__active'
    //     }else{
    //       return  'employee__onboarding'
    //     }
    //   }
    //   return (
    //     <span class={['employee__status', statusClass()]}>{translateStatus(text)}</span>
    //     //Không thể sử dụng được 2 dấu ngoặc nhọn ở translateStatus
    //   );
    // }
  },
  {
    title: 'Hành động',
    width: 120,
    // customRender: (_, item) => {
    //   return    (<div class="action manipulated__action employee__actions">
    //       <div @click="handleOpenUpdateModal(item.codeEmployee)" class="action__edit">
    //         <a-tooltip title="Sửa">
    //           <edit-outlined />
    //         </a-tooltip>
    //       </div>
    //       <div @click="handleID(item._id)" class="action__delete">
    //         <a-tooltip title="Xoá">
    //           <delete-outlined />
    //         </a-tooltip>
    //       </div>
    //     </div>)

    // }
  }
]
const { data, mutate: getEmployeeExcel } = useGetEmployeeMutation()
const handleChangeFile = e => {
  const fileUploaded = e.target.files?.[0];
  getEmployeeExcel({ file: fileUploaded })
};

const handleOpenAddModal = () => {
  textSearch.value = ''
  visible.value = true
}
// const provideDatasource = computed(() => {
//   if (listEmployees) {
//     let employees = listEmployees?.data?.data?.employeeList.filter(item => !item.is_deleted);
//     console.log(employees)
//     return employees.filter(item =>
//       item.name?.indexOf(textSearch.value) >= 0 ||
//       item.address?.indexOf(textSearch.value) >= 0 ||
//       item.email?.indexOf(textSearch.value) >= 0 ||
//       item.codeEmployee?.indexOf(textSearch.value) >= 0
//     ) 
//   } else {
//     return []
//   }

// })
watch(listEmployees,(newValue,oldValue)=>{
  let employees = newValue.data.data.employeeList.filter(item => !item.is_deleted)
  provideDatasource.value = employees.filter(item =>
      item.name?.indexOf(textSearch.value) >= 0 ||
      item.address?.indexOf(textSearch.value) >= 0 ||
      item.email?.indexOf(textSearch.value) >= 0 ||
      item.codeEmployee?.indexOf(textSearch.value) >= 0
    ) 
})
</script>

<style scoped lang="scss"></style>