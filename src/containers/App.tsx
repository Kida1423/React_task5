import React, { useState } from 'react';
import { Button, Alert, Row, Col } from 'antd';
import './App.css';

interface Cell {
  hasItem: boolean;
  isOpen: boolean;
}

const generateCells = (): Cell[] => {
  const cells: Cell[] = Array.from({ length: 36 }, () => ({ hasItem: false, isOpen: false }));
  const randomIndex = Math.floor(Math.random() * 36);
  cells[randomIndex].hasItem = true;
  return cells;
};

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[]>(generateCells());
  const [attempts, setAttempts] = useState(0);
  const [found, setFound] = useState(false);

  const handleClick = (index: number) => {
    if (found) return;

    const updatedCells = [...cells];
    if (!updatedCells[index].isOpen) {
      updatedCells[index].isOpen = true;
      setAttempts(attempts + 1);
      setCells(updatedCells);
      if (updatedCells[index].hasItem) {
        setFound(true);
      }
    }
  };

  const handleReset = () => {
    setCells(generateCells());
    setAttempts(0);
    setFound(false);
  };

  return (
    <div style={{ padding: ' 0 20px  '}}>
      <h2>Найдите спрятанное кольцо!</h2>
      {found && <Alert message={`Кольцо найдено за ${attempts} попыток!`} type="success" showIcon />}
      <div style={{ display: "flex", alignItems:"center", justifyContent:"space-between" }}>
        <Button onClick={handleReset} type="primary">Сбросить игру</Button>
        <p>Попытки: {attempts}</p>
      </div>
      <Row gutter={[8, 8]}>
        {cells.map((cell, index) => (
          <Col span={4} key={index}>
            <div
              onClick={() => handleClick(index)}
              className={`cell ${cell.isOpen ? 'open' : 'closed'}`}
              style={{
                width: '100%',
                height: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #000',
                backgroundColor: cell.isOpen ? '#d9f7be' : '#f0f0f0',
                cursor: found ? 'not-allowed' : 'pointer'
              }}
            >
              {cell.isOpen && cell.hasItem && ' О'}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default App;
