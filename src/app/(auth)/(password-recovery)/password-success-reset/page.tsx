import { CheckCircle } from 'lucide-react'

export default function PasswordSuccessResetPage() {
	return (
		<div className='flex flex-col gap-4 items-center '>
			<div className='text-center max-w-96 mb-4'>
				<div className='flex justify-center items-center mb-5'>
					<div className='bg-gray-100 p-3 rounded-xl'>
						<CheckCircle
							className='text-primary-color'
							width={22}
							height={22}
						/>
					</div>
				</div>

				<h1 className='mb-3 text-3xl font-bold'>Password reset!</h1>
				<div className='additional-text text-base'>
					Your password has been successfully reset.
					<p>Click below to log in magically</p>
				</div>
			</div>
			<button className='w-full bg-primary-color px-4 py-2 border text-white rounded-lg hover:bg-primary-color-hover transition-colors ease-linear duration-75'>
				Continue
			</button>
		</div>
	)
}
