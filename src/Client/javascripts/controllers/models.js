function Task(name, id) {
    this.Name = name;
    this.Id = id;
    this.Description = "";
}

function Day(date) {
    this.Date = date;
    this.Registrations = [];
    this.Id = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

}

function Registration(start) {
    this.Start = start;
    this.Note = '';
    this.Stop = null;
    this.Key = start.getFullYear() + '-' + start.getMonth() + '-' + start.getDate();
    this.LocationFrom = null;
    this.LocationTo = null;
}

function Location(lat, lon) {
    this.Latitude = lat;
    this.Longitude = lon;
}