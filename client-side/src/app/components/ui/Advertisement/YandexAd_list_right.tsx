import { FC, useEffect } from 'react'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'

const YandexAd_list_right: FC = () => {
	const { isAuth } = useTypedSelector(state => state.user)

	useEffect(() => {
		const script1 = document.createElement('script')
		script1.innerHTML = `
      window.yaContextCb = window.yaContextCb || [];
      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: 'R-A-2461588-5',
          renderTo: 'yandex_rtb_R-A-2461588-5'
        });
      });
    `
		document.head.appendChild(script1)

		return () => {
			document.head.removeChild(script1)
		}
	}, [])

	return (
		<div className='flex justify-center items-center rounded-2xl'>
			<div
				id={`yandex_rtb_R-A-2461588-5`}
				style={{
					maxHeight: isAuth ? 'calc(100vh - 180px)' : 'calc(100vh - 40px)',
					maxWidth: '160px',
				}}
			>
				<div
					style={{
						height: isAuth ? 'calc(100vh - 180px)' : 'calc(100vh - 40px)',
						width: '160px',
					}}
				></div>
			</div>
		</div>
	)
}

export default YandexAd_list_right
