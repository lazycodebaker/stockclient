import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { AccordionProps } from '../d';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Accordion: React.FC<AccordionProps> = ({ stock }) => {
  const { name, price, id } = stock;

  const [isOpen, setIsOpen] = React.useState(false);
  const [chartData, setChartData] = React.useState<{ time: number, price: number }[]>([]);

  useEffect(() => {
    const createDummyData = () => {
      const randomPrice = () => Math.floor(Math.random() * (500 - 100 + 1) + 100);
      const newPrice = randomPrice();
      setChartData((prevData) => {
        const newData = [...prevData, { time: Date.now(), price: newPrice }];
        if (newData.length > 10) {
          // Limit the number of data points displayed to 10, and remove the oldest data point.
          return newData.slice(1);
        }
        return newData;
      });
    }

    const interval2 = setInterval(() => {
      createDummyData();
    }, 1500);

    return () => clearInterval(interval2);
  }, []);

  const formatXAxisTick = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div key={id} className='flex flex-col rounded items-center bg-gray-200 text-black border-b border-black justify-center w-full'>
      <div className="py-2 w-full">
        <button
          className="flex justify-between sm:px-10 px-2 items-center w-full focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='font-semibold'>
            {name} - ${price.toPrecision(2)}
          </span>
          <div className={`flex items-center justify-center`}>
            {
              !isOpen ? <FaPlus size={16} /> : <FaMinus size={16} />
            }
          </div>
        </button>
        <motion.div
          className="sm:px-10 px-2 overflow-hidden howtobuycardhead"
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <div className='w-full flex items-start py-4 h-full sm:flex-row flex-col space-y-4 sm:space-y-0'>
            <div className='flex flex-col'>
              <h1>Price : <span>{stock.price.toPrecision(2)}</span></h1>
              <h1>Additional Data can be used here ...</h1>
            </div>

            <div className='w-full h-full'>
              <ResponsiveContainer width="90%" aspect={2}>
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="time"
                    domain={['dataMin', 'dataMax']}
                    type="number"
                    interval={0}
                    tickFormatter={formatXAxisTick} // Custom tick formatter
                  />
                  <YAxis domain={[0, 500]} />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Accordion;


// for reference ... hehe
/*

const createDummyData = () => {
      const randomPrice = () => Math.floor(Math.random() * (500 - 100 + 1) + 100);
      const newPrice = randomPrice();
      setChartData((prevData) => {
        const newData = [...prevData, { time: Date.now(), price: newPrice }];
        if (newData.length > 10) {
          // Limit the number of data points displayed to 10, and remove the oldest data point.
          return newData.slice(1);
        }
        return newData;
      });
    }

    const interval2 = setInterval(() => {
      createDummyData();
    }, 1500);

    return () => clearInterval(interval2);
  
*/