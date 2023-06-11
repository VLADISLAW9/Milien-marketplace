import { FC } from 'react'

const ErrorMessage: FC = () => {
	return (
		<section className='page_404'>
			<div className='container'>
				<div className='row'>
					<div className='col-sm-12 '>
						<div className='col-sm-10 col-sm-offset-1  text-center'>
							<div className='four_zero_four_bg '>
								<h1 className='text-center font-sans'>404</h1>
							</div>
							<div className='contant_box_404'>
								<p className='text-2xl font-sans font-bold mt-3'>Произошла ошибка</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ErrorMessage
