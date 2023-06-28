import { FC, useEffect } from 'react'

interface IYandexAd_grid {
	adNumber: number
}

const YandexAd_grid: FC<IYandexAd_grid> = ({ adNumber }) => {
	useEffect(() => {
		const script1 = document.createElement('script')
		script1.innerHTML = `
      window.yaContextCb = window.yaContextCb || [];
      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: 'R-A-2461588-4',
          renderTo: 'yandex_rtb_R-A-2461588-4-${adNumber}'
        });
      });
    `
		document.head.appendChild(script1)

		return () => {
			document.head.removeChild(script1)
		}
	}, [adNumber])

	return (
		<li className='flex justify-center shadow-stone-200 shadow-xl items-center rounded-2xl'>
			<div
				id={`yandex_rtb_R-A-2461588-4-${adNumber}`}
				style={{ maxHeight: '500px', maxWidth: '337px' }}
			>
				<div style={{ height: '500px', width: '337px' }}></div>
			</div>
		</li>
	)
}

export default YandexAd_grid
