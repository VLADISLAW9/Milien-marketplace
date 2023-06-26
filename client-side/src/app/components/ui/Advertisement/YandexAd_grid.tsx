import { useEffect } from 'react'

const YandexAd_grid = () => {
	useEffect(() => {
		const script1 = document.createElement('script')
		script1.innerHTML = `
      window.yaContextCb = window.yaContextCb || [];
      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: 'R-A-2461588-4',
          renderTo: 'yandex_rtb_R-A-2461588-4'
        });
      });
    `
		document.head.appendChild(script1)

		return () => {
			document.head.removeChild(script1)
		}
	}, [])

	return (
		<li className='flex justify-center items-center'>
			<div
				id='yandex_rtb_R-A-2461588-4'
				style={{ maxHeight: '500px', maxWidth: '337px' }}
			>
				<div style={{ height: '500px', width: '337px' }}></div>
			</div>
		</li>
	)
}

export default YandexAd_grid
