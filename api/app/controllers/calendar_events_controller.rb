class CalendarEventsController < ApplicationController
  include ExceptionHandler

  before_action :authenticate_user!
  before_action :check_authorization, only: [:update, :destroy]

  def index
    render json: current_user.calendar_events
  end

  def create
    calendar_event = current_user.calendar_events.new(calendar_event_params)
    calendar_event.save!
    render json: calendar_event
  end

  def update
    calendar_event = CalendarEvent.find(params[:id])
    calendar_event = calendar_event.update!(calendar_event_params)
    render json: calendar_event
  end

  def destroy
    calendar_event = CalendarEvent.find(params[:id])
    calendar_event.destroy!
  end

  private

  # ストロングパラメーター
  def calendar_event_params
    params.require(:calendar_event).permit(:title, :description, :start_date, :end_date)
  end

  # ログインユーザーと予定を追加したユーザーが一致しているか確認
  def check_authorization
    if current_user.id != CalendarEvent.find(params[:id]).user_id
      raise User::NotAuthorized
    end
  end
end
