// src/components/Employees/Employees.js
import { Box } from '@mui/material'
import './Employees.scss'
import TitleSubtitle from '../../../../UI/TitleSubtitle/TitleSubtitle'
import EmployCard from './EmployCard/EmployCard'
import EmployeeModal from './EmployModal/EmployModal'
import { useMemo, useState } from 'react'
import { EMPLOYEES_INFORMATION } from './constans'

const Employees = () => {
	const [selectedEmployee, setSelectedEmployee] = useState(false)
	const handleCardClick = employee => {
		setSelectedEmployee(employee)
	}

	const closeModal = () => {
		setSelectedEmployee(false)
	}

	return (
		<>
			{useMemo(
				() => (
					<Box id='Employees' className='employeesContainer'>
						<>
							<TitleSubtitle
								titleText='Преподаватели'
								subtitleText='Опытные наставники на пути к миру моды и стиля'
							/>
							<Box className='employeesList'>
								{EMPLOYEES_INFORMATION.map((employee, index) => (
									<Box
										key={index}
										className={`employCardWrapper ${
											selectedEmployee === employee
												? 'selectedCard'
												: 'unselectedCard'
										}`}
										onClick={() => handleCardClick(employee)}
									>
										<EmployCard {...employee} />
									</Box>
								))}
							</Box>
						</>
					</Box>
				),
				[]
			)}
			<EmployeeModal employee={selectedEmployee} onClose={closeModal} />
		</>
	)
}

export default Employees
