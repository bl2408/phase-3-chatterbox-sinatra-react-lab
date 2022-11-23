class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add routes
  get '/messages' do 
    Message.all.order(:created_at).to_json
  end


  post '/messages' do 
    Message.create(username: params[:username], body: params[:body]).to_json
  end

  patch "/messages/:id" do
    m = Message.find(params[:id])
    m.update(
      body: params[:body]
    )
    m.to_json
  end

  delete "/messages/:id" do
    m = Message.find(params[:id])
    m.destroy
    m.to_json
  end
  
end
