import React from 'react'

const HowToSignIn = () => {
	return (
		<div className='mt-10  mb-20'>
			<h1 className='font-semibold text-2xl text-center'>
				Регистрация на сайте «Мильён» происходит в три этапа
			</h1> 
			<div className='mt-16'>
				<p className='mt-7 text-xl leading-9'>
						<span className='font-medium'>1. Создание логина и пароля.</span> <br/>
						Логин – уникальное имя пользователя. Вводится в свободном формате, на английском или <br/>русском языках. Требований к созданию пароля больше: от 8 символов английскими буквами, <br/>среди которых должна присутствовать минимум одна цифра и заглавная буква. Подобные <br/>требования способствуют лучшей защите вашего аккаунта от взлома.
				</p>
				<div className='flex justify-center items-center mt-5'>
					<img width={600}  src='/sign-in-img-1.jpg'/>
				</div>
			</div>
			<div className='mt-16'>
				<p className='mt-7 text-xl leading-9'>
						<span className='font-medium'>2. Ввод вашего имени и номера телефона.</span> <br/>
						Введите имя, чтобы потенциальные клиенты знали, как к вам обращаться в диалоге. <br/>  Номер телефона же понадобится для лучшей защиты вашего аккаунта, а также удобства <br/> взаимодействия с покупателями. В случае же утери пароля вы сможете в любой момент <br/> восстановить доступ к нему. 
				</p>
				<div className='flex justify-center items-center mt-5'>
					<img width={600}  src='/sign-in-img-2.jpg'/>
				</div>
			</div>
			<div className='mt-16'>
				<p className='mt-7 text-xl leading-9'>
						<span className='font-medium'>3. Заключительный этап.</span> <br/>
						После нажатия кнопки «Подтвердить телефон» вам поступит на номер, который вы указывали  <br/> уведомление в виде всплывающего меню, где необходимо будет нажать соответствующую кнопку. <br/> После успешного подтверждения ваш аккаунт автоматически создастся.

				</p>
				<div className='flex justify-center items-center mt-5'>
					<img width={600}  src='/sign-in-img-3.jpg'/>
				</div>
			</div>
		</div>
	)
}

export default HowToSignIn