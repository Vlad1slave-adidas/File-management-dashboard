declare interface SignInFormData {
	email: string
	password: string
}

declare interface SignUpFormData {
	name: string
	email: string
	password: string
}

declare interface ButtonAuthNavProps {
	link: string
	text: string
	additionalText: string
}

declare interface ForgetPasswordFormData {
	email: string
}

declare interface ConfirmPasswordFormData {
	otp1: number
	otp2: number
	otp3: number
	otp4: number
	otp5: number
	otp6: number
}

declare interface NewPasswordFormData {
	newPassword: string
	confirmPassword: string
}

declare interface SignUpParams {
	email: string
	password: string
	name: string
}

declare interface SignInParams {
	email: string
	password: string
}

declare interface SignUpFormProps {
	error: string | null
	isLoading: boolean
	onSubmit: SubmitHandler<SignUpFormData>
}

declare interface ButtonNavProps {
	text: string
	icon: JSX.Element
	link: string
}

declare interface ButtonSubmitProps {
	isLoading: boolean
	text: string
}

declare interface ToastErrorProps {
	error: any
	message: string
}

declare interface ToastSuccessProps {
	isSuccess: boolean
	message: string
}

declare interface UpdateRecoveryParams {
	userId: string
	secret: string
	password: string
}
