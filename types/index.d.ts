declare type FileType = 'document' | 'image' | 'video' | 'audio' | 'other'

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

declare interface UploadFileParams {
	formData: FormData
	ownerId: string
	accountId: string
	path: string
}

declare interface CreateFolderParams {
	formData: FormData
	accountId: string
	id?: string
}

declare interface ButtonAddFilesProps {
	ownerId: string
	accountId: string
}

declare interface FileCardProps {
	name: string
	icon: string
	url: string
	member: number
	lastModified: string
}

declare interface ButtonDropdownProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	width?: number
	height?: number
}

declare interface FilesSectionProps {
	files: DocumentList<Document>
	fileIcons: DocumentList<Document>
}

declare interface StorageChartProps {
	usedStorage: number
	totalStorage: number
	convertedUsedStorage: string
	convertedTotalStorage: string
}

declare interface FileTypeCardProps {
	image: JSX.Element
	text: string
	fileCount: number
	totalSize: string
}

declare interface ModalProps {
	isOpen: boolean
	content: JSX.Element
	handler: () => void
}

declare type Folder = {
	$id: string
	name: string
	children: Folder[]
}
