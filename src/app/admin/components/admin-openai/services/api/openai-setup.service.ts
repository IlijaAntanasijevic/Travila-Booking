import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { IOpenAIConfig } from '../../interfaces/i-openai-setup';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class OpenaiSetupService extends ApiService<IOpenAIConfig>{

  constructor(http: HttpClient) {
    super(apiPaths.admin.openai, http)
  }
}
