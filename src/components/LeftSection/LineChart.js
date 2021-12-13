import { Line } from "react-chartjs-2";

export const LineChart = ({ data, caseType,setCaseType }) => {
    // Chart Animation
    const totalDuration = 4000;
    const delayBetweenPoints = totalDuration / data.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    };

    const dataset = {
        datasets: [{
            label: `Number of ${caseType}`,
            data,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.8,
            hoverBorderCapStyle: 'green',
            hoverBorderRadius: '15px',
            borderWidth: 1,
        }],
    }

    const options = {
        radius: 0,
        hoverRadius: 10,
        hitRadius: 10,
        animation,
    }

    return (
        <div className='line-chart'>
            <div className='chart-header'>
                <h2>Total {caseType} since January</h2>
                <select value={caseType} onChange={e => setCaseType(e.target.value)}>
                    <option value='cases'>Cases</option>
                    <option value='deaths'>Deaths</option>
                    <option value='recovered'>Recovered</option>

                </select>
            </div>
            {data.length > 0 ? <Line data={dataset} options={options} /> : <div></div>}
        </div>
    );
}