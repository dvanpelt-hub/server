CREATE TABLE stock_holdings (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  ticker_symbol VARCHAR(10) NOT NULL,
  recommendation_status VARCHAR(4) NOT NULL,
  stock_value VARCHAR(15),
  posting VARCHAR(120) NOT NULL,
  purchase_price NUMERIC NOT NULL
)