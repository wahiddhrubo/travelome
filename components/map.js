import { Map } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

export default function MapComp({ mapDetails }) {
	return (
		<div>
			<Map
				provider={osm}
				defaultCenter={mapDetails[0].position}
				defaultZoom={11}
			>
				{mapDetails.map((m) => (
					<Marker width={50} anchor={m.position} />
				))}
			</Map>
		</div>
	);
}
