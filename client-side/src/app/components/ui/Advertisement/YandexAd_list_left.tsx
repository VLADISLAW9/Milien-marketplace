import { FC, useEffect } from 'react'

const YandexAd_list_left: FC = () => {
	useEffect(() => {
		const script1 = document.createElement('script')
		script1.innerHTML = `
      window.yaContextCb = window.yaContextCb || [];
      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: 'R-A-2461588-6',
          renderTo: 'yandex_rtb_R-A-2461588-6'
        });
      });
    `
		document.head.appendChild(script1)

		return () => {
			document.head.removeChild(script1)
		}
	}, [])

	return (
		<div className='flex  justify-center items-center rounded-2xl'>
			<div
				id={`yandex_rtb_R-A-2461588-6`}
				style={{
					maxHeight: 'calc(100vh - 40px)',
					maxWidth: '160px',
				}}
			>
				<div
					style={{
						height: 'calc(100vh - 40px)',
						width: '160px',
					}}
				></div>
			</div>
		</div>
	)
}

export default YandexAd_list_left
