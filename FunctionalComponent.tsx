import * as ReactDOM from "react-dom";
import React, { useEffect, useMemo, useState } from "react";

interface StopwatchProps {
	initialSeconds: number;
}
type IncrementerType = ReturnType<typeof setInterval>;

const formatSeconds = (sec: number): string => Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);

function Stopwatch(props: StopwatchProps) {
	const [incrementer, setIncrementer] = useState<IncrementerType | null>();
	const [secondsElapsed, setSecondsElapsed] = useState<number>(props.initialSeconds);
	const [incrementerRunning, setIncrementerRunning] = useState<boolean>(false);
	const [laps, setLaps] = useState<Array<number>>([]);

	useEffect(() => {
		return () => clearInterval(incrementer as IncrementerType);
	}, []);

	useEffect(() => {
		clearInterval(incrementer as IncrementerType);
		if(incrementerRunning) {
			setIncrementer(setInterval(() => {
				setSecondsElapsed(secondsElapsed + 1);
			}, 1000));
		}
	}, [incrementerRunning, secondsElapsed]);

	function handleStartClick() {
		setIncrementerRunning(true);
	}

	function handleStopClick() {
		setIncrementerRunning(false);
	}

	function handleResetClick() {
		setIncrementerRunning(false);
		setLaps([]);
		setSecondsElapsed(0);
	}

	function handleLapClick() {
		setLaps([...laps, secondsElapsed]);
	}

	function handleDeleteClick(index: number) {
		return () => {
			const newLaps = [...laps];
			newLaps.splice(index, 1);
			setLaps(newLaps);
		}
	}
	
	return (
		<div className="stopwatch">
			<h1 className="stopwatch-timer">{formatSeconds(secondsElapsed)}</h1>
			{incrementerRunning ?
				<>
					<button
						type="button"
						className="stop-btn"
						onClick={handleStopClick}
					>
						stop
					</button>
					{secondsElapsed !== 0 && (
						<>
							<button
								type="button"
								onClick={handleLapClick}
							>
								lap
							</button>
							<button
								type="button" 
								onClick={handleResetClick}
							>
								reset
							</button>
						</>
					)}
				</> :
				<button
					type="button"
					className="start-btn"
					onClick={handleStartClick}
				>
					start
				</button>
			}
			<div className="stopwatch-laps">
				{ laps.map((lap, i) => <Lap index={i+1} lap={lap} onDelete={handleDeleteClick(i)} />) }
			</div>
		</div>
	);
}

interface LapProps {
	index: number;
	lap: number;
	onDelete: () => void;
}

function Lap(props: LapProps) {
	const formattedSeconds: string = useMemo(() => formatSeconds(props.lap), [props.lap]);

	return (
		<div key={props.index} className="stopwatch-lap">
			<strong>{props.index}</strong> / {formattedSeconds} 
			<button onClick={props.onDelete} > X </button>
		</div>
	);
};

ReactDOM.render(
	<Stopwatch initialSeconds={0} />,
	document.getElementById("content"),
);