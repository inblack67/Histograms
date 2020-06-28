import React, { useEffect, useState } from 'react';
import HighCharts from 'highcharts';
import ReactHighCharts from 'highcharts-react-official';
import fetchPages from '../ajaxCalls/fetchPages';

const Posts = () => {

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const wordCount = [];

    useEffect(() => {
        getPages();
    },[])

    const getPages = async () => {
        const res = await fetchPages();
        setPages(res.data);
        setLoading(false);
    }

    const getWordCount = () => {
        if(pages){
            const res = pages.map(page => page.content.rendered.match(/\S+/gi));
            res.forEach(r => {
                if(r){
                    wordCount.push(r.length)
                }
            })
        }
    }

    getWordCount();

    const options = {
        chart: {
            type: 'column',
            zoomType: 'xy'
        },
        title: {
            text: 'Pages Word Count',
            style: {
                color: 'tomato'
            }
        },
        tooltip: {
            shared: true,
            formatter(){
                return `<strong>Pages: ${this.x}</strong>
                <br /><strong>Words: ${this.y}</strong>`
            }
        },
        yAxis: {
            title: {
                text: 'Words'
            },
        },
        xAxis: {
            title: {
                text: 'Pages'
            },
        },
        credits: {
            enabled: false
        },
        colors: ['tomato'],
        series: [
            {
                name: 'Pages',
                data: wordCount
            }
        ]
    }

    if(loading){
        return <h5 className='text-center'>Loading...</h5>
    }

    return (
        <div className="container">
            <ReactHighCharts options={options} highcharts={HighCharts} />
        </div>
    )
}

export default Posts
