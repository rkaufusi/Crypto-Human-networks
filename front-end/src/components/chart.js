import React, {useEffect, useState} from 'react'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement, PointElement} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

const Chart = ({ph}) => {
    let labels = []
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        LineElement,
        PointElement
    )
    let testLabels = []

    const [testLabels1, settestLabels1] = useState([])
    const [historyData, sethistoryData] = useState([])

    useEffect(() => {
        if(ph.length > 0){
            let label = []
            let amount = []
            for(let i = ph.length - 1; i > ph.length - 100; i--){
                label.unshift(ph[i][0])
                amount.unshift(ph[i][1])   
            }
            let curr = []
            for(let i = 0; i < label.length; i++){
                let d = new Date(label[i]) 
                let formatted = d.toLocaleDateString()
                curr.push(formatted)
            }
            settestLabels1(curr)
            sethistoryData(amount)
        }
    },[ph])

    for(let i = 0; i < testLabels.length; i++){
        let d = new Date(testLabels[i]) 
        let formatted = d.toLocaleDateString()
        testLabels1.push(formatted)
    }
    
    let data = {
        labels: testLabels1,
        datasets: [{
            label: '',
            data: historyData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    let options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontsize: 26
            }
        }
    }
    return (
        <div>
        <Line
            data={data} 
            height={400}
            options={options}  
        />
        </div>
    )
}

export default Chart
