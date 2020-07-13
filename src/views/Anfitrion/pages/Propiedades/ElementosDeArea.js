import React from 'react'

function ElementosDeArea({match}){
	const {areaId} = match.params
	return(
		<div>
			<h1>ElementosDeArea {areaId}</h1>
		</div>
	)
}

export default ElementosDeArea